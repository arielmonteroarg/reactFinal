import { Link } from "react-router-dom";
import llavero from "../img/llavero.webp";
import sticker from "../img/sticker.webp";
import fundas from "../img/fundas.webp";
import "./category.css"

function Category(){
    return(
  
        <div className="category-container">
        <div className="item-list">
            <div className="item-card">
            <Link to="/category/Llavero">
                        <img src={llavero} alt="llavero" className="item-image" />
                    </Link>
                <p className="item-title">LLAVERO</p>
            </div>
            <div className="item-card">
            <Link to="/category/Sticker">
                        <img src={sticker} alt="sticker" className="item-image" />
                    </Link>
                <p className="item-title">STICKER</p>
            </div>
            <div className="item-card">
            <Link to="/category/Fundas">
                        <img src={fundas} alt="fundas" className="item-image" />
                    </Link>
                <p className="item-title">FUNDAS</p>
            </div>
        </div>
        <Link to="/" className="home-link"><button className="item-button">Volver</button></Link>
    </div>
    )

}
export default Category;