import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../config/Firebase"; // Importa la configuración de Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir


// Crear el contexto
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario
   const navigate = useNavigate(); // Hook para redirigir
  

  // Efecto para detectar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Si el usuario está logueado, actualiza el estado
      } else {
        setUser(null); // Si no hay usuario, establece el estado a null
      }
    });
    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, []);

  // Función para iniciar sesión
   const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      toast.error(`Error al iniciar sesión: Inténtalo de nuevo. `); 
    }
  };
 

  // Función para registrar un nuevo usuario
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      toast.error(`Error al registrar usuario: Inténtalo de nuevo. `);
    }
  }; 

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      toast.error(`Error al cerrar sesión: Inténtalo de nuevo.`);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};