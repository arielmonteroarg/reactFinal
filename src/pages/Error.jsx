import { Link } from "react-router-dom";
import './Error.css'; // Importa los estilos

function Error() {
  return (
    <div className="error-container">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to="/">Volver</Link>
    </div>
  );
}

export default Error;