import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext'; // Importa el hook useUser
import { db } from '../../config/Firebase'; // Importa Firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import './Purchase.css'; // Estilos para el componente

const HistoryPurchase = () => {
  const { user } = useUser(); // Obtén el usuario actual
  const [purchases, setPurchases] = useState([]); // Estado para almacenar las compras
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [authChecked, setAuthChecked] = useState(false); // Estado para verificar si la autenticación se ha verificado
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    // Si el usuario no está autenticado y la autenticación ya se verificó, redirige a la página de inicio de sesión
 /*    if (!user && authChecked) {
      navigate('/auth'); // Cambia a página de inicio de sesión
      return;
    } */
      if (!authChecked && !user) {
        navigate('/auth'); // Cambia a la página de inicio de sesión
        return;
      }

    // Si el usuario está autenticado, obtén el historial de compras
    if (user) {
      const fetchPurchases = async () => {
        try {
          // Consulta las compras del usuario actual
          const purchasesRef = collection(db, 'purchases');
          const q = query(purchasesRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);

          // Transforma los documentos en un array de compras
          const purchasesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPurchases(purchasesData);
        } catch (error) {
          console.error('Error al obtener el historial de compras:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPurchases();
    }
  }, [user, authChecked, navigate]);

  // Efecto para marcar que la autenticación se ha verificado
  useEffect(() => {
    if (user !== null) {
      setAuthChecked(true);
    }
  }, [user]);

  // Si la autenticación aún no se ha verificado, muestra un mensaje de carga
  if (!authChecked) {
    return <div>Verificando autenticación...</div>;
  }

  // Si el usuario no está autenticado, no renderiza nada (ya se redirigió)
  if (!user) {
    return null;
  }

  if (loading) {
    return <div>Cargando historial de compras...</div>;
  }

  return (
    <div className="purchase-history">
      <h2>Historial de Compras</h2>
      {purchases.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        <ul>
          {purchases.map((purchase) => (
            <li key={purchase.id} className="purchase-item">
              <p>Fecha: {new Date(purchase.date.seconds * 1000).toLocaleDateString()}</p>
              <p>Total: ${purchase.total}</p>
              <ul>
                {purchase.products.map((product, index) => (
                  <li key={index}>
                    Nombre: {product.title}, Descripción: {product.description}, Categoría: {product.category}, Cantidad: {product.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPurchase;