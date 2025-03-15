

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Error from "./pages/Error";
import Layout from "./pages/Layout";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import Cart from './components/Cart/Cart'; // Importa el componente Cart
import { CartProvider } from "./context/CartContext"; // Importa el proveedor del contexto
import { UserProvider } from './context/UserContext'; // Importa el UserProvider
import AuthForm from './components/AuthForm/AuthForm'; // Importa el AuthForm
import HistoryPurchases from "./components/Purchase/HistoryPurchase";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return(
 <div>
    <div className="App">
      <BrowserRouter>
        <UserProvider>
            <CartProvider>  
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="category" element={<Category/>}/>
                        <Route path="/category/:categoryId" element={<ItemListContainer greeting="Bienvenidos a la Tienda"  />}/>
                        <Route path="/item/:id" element={<ItemDetailContainer  greeting="Detalle de Producto" />} />
                        <Route path="/cart" element={<Cart />} /> {/* Ruta para el carrito */}
                        <Route path="/auth" element={<AuthForm />} />
                        <Route path="/HistoryPurchases" element={<HistoryPurchases />} />
                        <Route path="*" element={<Error/>}/>
                    </Route>
                </Routes>
                
                </CartProvider>  
            </UserProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
 </div>
    )
}
export default App;