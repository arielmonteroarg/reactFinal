
import './ItemDetailContainer.css';
 import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productsData from "../../data/product.json";


const ItemDetailContainer = ({greeting}) => {

    //CONTADORES DEN LOS NUMEROS
    const [contadorUno, setContadorUno]=useState(0);

    useEffect(() => {}, [contadorUno]);

    const { id } = useParams(); // Captura el ID de la URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
  
   // LLAMADO A LA API DE PRODUCTOS 
   useEffect(() => {
    const fetchProducts = () => {
      try {
        // Filtramos el producto por ID
        const productFound = productsData.find((prod) => prod.id === parseInt(id));
        setProduct(productFound);
      } catch (error) {
        console.error("Error al cargar los productos", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [id]);
  
  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

    const { image, title, category, price, description} = product;
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
                <button className="counter-button" onClick={() => setContadorUno(contadorUno - 1)}>-</button>
                <span className="counter-value">{contadorUno}</span>
                <button className="counter-button" onClick={() => setContadorUno(contadorUno + 1)}>+</button>
            </div>
            <div className="columns">
            <Link to="/"><button className="item-button">Volver</button></Link>
            </div>
        </div>
        </div>

  );
};

export default ItemDetailContainer;