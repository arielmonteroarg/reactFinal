import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './AuthForm.css';
import { toast } from 'react-toastify';



const AuthForm = () => {
  const { login, register } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Inicializa useNavigate



const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isLogin) {
      await login(email, password);
    } else {
      await register(email, password);
    }
    navigate('/');
  } catch (error) {
    const errorMessage = error.message || 'Error desconocido al iniciar sesión';
    toast.error(errorMessage,{pauseOnHover: true,closeOnClick: true});  // Mostrar el error con toast
    //Aparente mensaje de error de Firebase muestra error en consola de Bad Request aun cuando lo estoy tratando con el catch
  }
};

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
        {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}
      </button>
    </div>
  );
};

export default AuthForm;