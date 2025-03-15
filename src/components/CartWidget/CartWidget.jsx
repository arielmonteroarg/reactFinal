import { FaCartShopping } from "react-icons/fa6"; // Importación de íconos
import "./CartWidget.css"; // Importación de estilos
import { useCart } from '../../context/CartContext'; // Importación del contexto

const CartWidget = () => {
  const { getTotalItems } = useCart(); // Usa el hook useCart

  return (
    <div className="cart-widget">
       <FaCartShopping className="cart-icon" />
       <span className="cart-count">{getTotalItems()}</span>
    </div>
  );
};

export default CartWidget;