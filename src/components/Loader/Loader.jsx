// Loader.jsx
import React from 'react';
import './Loader.css'; // Estilos para el loader
import loaderImage from '../../img/loader.svg';

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loaderImage} alt="Cargando..." className="loader" />
    </div>
  );
};

export default Loader;