import React from 'react';
import { useCart } from '../../context/CartContext'; // Importa el hook useCart
import { useUser } from '../../context/UserContext'; // Importa el hook useUser
import {updateStock} from "../UpdateItems/UpdateItem";
import { toast } from 'react-toastify';
import './Cart.css'; // Estilos para el componente
import { savePurchase } from '../Purchase/AddPurchase'; // Importa la función savePurchase
import { Link } from 'react-router-dom'; // Importa Link para redirigir



const Cart = () => {
  const { cart, clearCart, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const { user } = useUser(); // Obtén el usuario actual

  // Si el carrito está vacío, muestra un mensaje
  if (cart.length === 0) {
    return <div className="cart-empty"> 
      <h1>¡Ups!</h1>
      <p>El carrito está vacío.</p>
      </div>;
  }

  const handleCheckout = async () => {
    try {
      // Recorre cada producto en el carrito
      for (const item of cart) {
        await updateStock(item.id, item.quantity); // Actualiza el stock
      }


      // Guarda la compra en la colección `Compras`

    await savePurchase(user.uid, cart, getTotalPrice());



      // Limpia el carrito solo si todas las actualizaciones son exitosas
      clearCart();

      // Muestra una notificación de éxito
      toast.success('Compra finalizada y stock actualizado', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      // Muestra una notificación de error
      toast.error(error.message || 'Error al finalizar la compra', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  const handleclearCart = async () => {
       // Limpia el carrito solo si todas las actualizaciones son exitosas
       clearCart();
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={require(`../../img/${item.image}`)} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio unitario: ${item.price}</p>
              <p>Subtotal: ${item.price * item.quantity}</p>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)} // Elimina el producto del carrito
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Resumen del Carrito</h3>
        <p>Total de productos: {getTotalItems()}</p>
        <p>Total a pagar: ${getTotalPrice()}</p>
       


        {user ? (
          <>
           <button onClick={handleCheckout} className="checkout-button">
            Finalizar Compra
          </button>
          <button onClick={handleclearCart}  className="checkout-button">
          Limpiar Carrito
        </button>
          </>
 
        ) : (
          <Link to="/auth" className="btn-login">
            Iniciar sesión para finalizar la compra
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;