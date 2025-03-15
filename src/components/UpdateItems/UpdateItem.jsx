import { db } from '../../config/Firebase'; // Importa Firestore
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

export const updateStock = async (productId, quantityPurchased) => {
  try {
    // Obtén la referencia al documento del producto
    const productRef = doc(db, 'items', productId);

    // Obtén el documento del producto
    const productDoc = await getDoc(productRef);

    if (productDoc.exists()) {
      // Obtén el stock actual
      const currentStock = productDoc.data().stock;

      // Valida que haya suficiente stock
      if (currentStock < quantityPurchased) {
        throw new Error(`No hay suficiente stock para el producto: ${productDoc.data().title}`);
      }

      // Calcula el nuevo stock
      const newStock = currentStock - quantityPurchased;

      // Actualiza el stock en Firestore
      await updateDoc(productRef, {
        stock: newStock,
      });


      toast.success(`Stock actualizado correctamente`);
    } else {
      throw new Error('El producto no existe');
    }
  } catch (error) {
    toast.error(`Error al actualizar el stock:${error}`);
    throw error; // Relanza el error para manejarlo en el componente
  }
};

export default updateStock;