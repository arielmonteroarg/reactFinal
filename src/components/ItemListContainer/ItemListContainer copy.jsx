/* import "./ItemListContainer.css"; */
import './ItemCard.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import productsData from "../../data/product.json";



function ItemListContainer({greeting}) {

  const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      // Simula una carga asíncrona para mantener la estructura del componente
      const loadProducts = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 200)); // Simula un pequeño delay
          setProducts(productsData); // Usamos los datos importados
        } catch (error) {
          console.error("Error al cargar los productos", error);
        } finally {
          setLoading(false);
        }
      };
  
      loadProducts();
    }, []);
  
    if (loading) return <p>Cargando productos...</p>;


      // Filtramos los productos por categoría si se recibe un categoryId
   // Filtramos los productos por categoría si se recibe un categoryId
   const filteredProducts = categoryId
   ? products.filter((product) => product.category.toLowerCase() === categoryId.toLowerCase())
   : products;
   
  return (
    <div className="container">
      <h1>{greeting}</h1>
    <div className="item-list">
    {filteredProducts.map((product) => (
      <div key={product.id} className="item-card">
       <img src={require(`../../img/${product.image}`)} alt={product.title} className="item-image" />
        <h3 className="item-name">{product.title}</h3>
        <p className="item-category">{product.category}</p>
        <p className="item-price">${product.price}</p>
        <Link to={`/item/${product.id}`}><button className="item-button">Ver Detalles</button>
        </Link>
      </div>
    ))}
  </div>
  </div>

    );
  }
  
  export default ItemListContainer;