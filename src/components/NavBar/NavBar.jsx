import CartWidget from "../CartWidget/CartWidget";
import UserWidget from '../UserWidget/UserWidget'; // Importa el UserWidget
import "./NavBar.css";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png"

function NavBar(){
return(


<nav className="navbar">
      <ul className="nav-list">
      <li className="nav-item">
          <Link to="/" className="nav-link">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="category" className="nav-link">
          category
          </Link>
        </li>
        <li className="nav-item">
          <Link to="category/Fundas" className="nav-link">
          Fundas
          </Link>
        </li>
        <li className="nav-item">
          <Link to="category/Llavero" className="nav-link">
          Llaveros
          </Link>
        </li>
        <li className="nav-item">
          <Link to="category/Sticker" className="nav-link">
          Stickers
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/HistoryPurchases" className="nav-link">
          Historial de Compras
          </Link>
        </li>
        <li className="nav-item">
          <UserWidget /> 
        </li>
        <li className="nav-item">
      <Link to="/cart" className="nav-link">
        <CartWidget />
      </Link>
    </li>
      </ul>
    </nav>




);
}

export default NavBar;