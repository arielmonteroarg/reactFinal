/* import "./ItemListContainer.css"; */
import './ItemCard.css';
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast } from 'react-toastify';

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Referencia a la colección de Firestore
        const itemsCollectionRef = collection(db, "items");
        
        // Si hay una categoría en la URL, filtramos los productos en Firebase
        let q = categoryId
          ? query(itemsCollectionRef, where("category", "==", categoryId))
          : itemsCollectionRef;

        const querySnapshot = await getDocs(q);

        // Mapeamos los datos obtenidos de Firebase
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      } catch (error) {
     
        toast.error('Error al cargar los productos desde Base de Datos:.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;
  if (products.length === 0) return <p>No hay productos en esta categoría</p>;

  return (
    <div className="container">
      <h1>{greeting}</h1>
    <div className="item-list">
    {products.map(({ id, image, title, category, price }) => (
          <div key={id} className="item-card">
            <img src={require(`../../img/${image}`)} alt={title} className="item-image" />
            <h3 className="item-name">{title}</h3>
            <p className="item-category">{category}</p>
            <p className="item-price">${price}</p>
            <Link to={`/item/${id}`}>
              <button className="item-button">Ver más</button>
            </Link>
          </div>
        ))}
  </div>
  </div>

    );
  }
  
  export default ItemListContainer;