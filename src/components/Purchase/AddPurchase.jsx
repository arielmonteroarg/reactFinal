import { db } from '../../config/Firebase'; // Importa Firestore
import { collection, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

//funcion para crear un codigo aleatorio
const generateRandomCode = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');  // HH
  const minutes = String(now.getMinutes()).padStart(2, '0'); // MM

  return `${hours}${minutes}${result}`;
};

export const savePurchase = async (userId, cart, total) => {
  try {
    //asigno el el codigo
  const codigoEnvio= generateRandomCode(15);
    // Datos de la compra
    const purchaseData = {
      userId, // ID del usuario
      products: cart.map(item => ({
        title: item.title,
        description: item.description,
        category : item.category,
        productId: item.id,
        quantity: item.quantity,
      })),
      total, // Total de la compra
      codigoEnvio, //codigo de envio
      date: new Date(), // Fecha de la compra
    };

    // Guarda la compra en Firestore
    await addDoc(collection(db, 'purchases'), purchaseData);
    toast.success(`Compra guardada correctamente codigo de envio : ${codigoEnvio} `,{pauseOnHover: true,closeOnClick: true});
  } catch (error) {
    toast.error(`Error al guardar la compra: ${error} `,{pauseOnHover: true,closeOnClick: true});
    throw error; // Relanza el error para manejarlo en el componente que llama a esta función
  }
};