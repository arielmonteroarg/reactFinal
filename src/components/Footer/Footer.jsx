import React from 'react';
import './Footer.css'; // Importa el archivo CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sobre Nosotros</h3>
          <p>Somos una empresa dedicada a ofrecer los mejores productos y servicios.</p>
        </div>
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="#asd">Inicio</a></li>
            <li><a href="#sad">Acerca de</a></li>
            <li><a href="#asd">Servicios</a></li>
            <li><a href="#asd">Contacto</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;