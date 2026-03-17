import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";

import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";

function App() {

  return (

    <CartProvider>
      <SearchProvider>

        <BrowserRouter>
          {/* Barra de navegación superior */}
          <NavBar/>

          {/* Definición de todas las rutas de la app */}
          <Routes>
            <Route path="/" element={<ItemListContainer/>}/>
            <Route path="/category/:categoryId" element={<ItemListContainer/>}/>
            <Route path="/item/:itemId" element={<ItemDetailContainer/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
        
      </SearchProvider>
    </CartProvider>

  );

}

export default App;