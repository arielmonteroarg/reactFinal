
import './ItemDetailContainer.css';
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { db } from "../../config/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from '../../context/CartContext'; // Ruta correcta
import { toast } from 'react-toastify';

const ItemDetailContainer = ({ greeting }) => {
  const { id } = useParams(); // Captura el ID de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contadorUno, setContadorUno] = useState(0);
  const { addToCart } = useCart(); // Usa el hook useCart

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Referencia a la colección de Firestore
        const itemsCollectionRef = collection(db, "items");
        const querySnapshot = await getDocs(itemsCollectionRef);

        // Transformamos los datos obtenidos
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filtramos el producto por ID
        const productFound = products.find((prod) => prod.id === id);
        setProduct(productFound);
      } catch (error) {
        toast.error(`Error al cargar los productos desde la base de datos${error} `);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  const { image, title, category, price, description } = product;

    // Función para manejar el clic en "Agregar al carrito"
    const handleAddToCart = () => {
      if (contadorUno > 0) {
        addToCart(product, contadorUno); // Pasa el producto y la cantidad
        toast.success(`${contadorUno} ${title} se agrego al carrito`);
      } else {
        toast.error('La cantidad debe ser mayor a 0.',{pauseOnHover: true,closeOnClick: true});
      }
    };
  return (

    <div className="container">
      <h1>{greeting}</h1>
      <div key={id} className="item-detail">
          <img src={require(`../../img/${image}`)} alt={title} className="item-image" />
          <h3 className="item-name">{title}</h3>
          <p className="item-category">{category}</p>
          <p className="item-price">${price}</p>
          <p className="item-description">{description}</p>
          <div className="columns">
          <button
            className="counter-button"
            onClick={() => setContadorUno((prev) => (prev > 1 ? prev - 1 : 1))} // No permite valores menores a 1
          >
            -
          </button>
          <span className="counter-value">{contadorUno}</span>
          <button
            className="counter-button"
            onClick={() => setContadorUno((prev) => prev + 1)} // Incrementa la cantidad
          >
            +
          </button>
        </div>
        <div className="columns">
          <button className="item-button" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        </div>
        </div>
        </div>

  );
};

export default ItemDetailContainer;