import { FaUserAlt } from "react-icons/fa"; // Importación de íconos
import { FaUserTimes } from "react-icons/fa";
import { useUser } from '../../context/UserContext'; // Importa el hook useUser
import { Link } from 'react-router-dom';
import './UserWidget.css';

const UserWidget = () => {
  const { user, logout } = useUser(); // Usa el hook useUser

  return (
    <div className="user-widget">
      {user ? (
        <div className="user-info">
          <span>{user.email}</span>
          <button onClick={logout} className="logout-button">
          <FaUserTimes /> 
          </button>
        </div>
      ) : (
        <Link to="/auth" className="login-link">
         <FaUserAlt /> Iniciar sesión / Registrarse
        </Link>
      )}
    </div>
  );
};

export default UserWidget;