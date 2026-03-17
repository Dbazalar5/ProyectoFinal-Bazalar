import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { SearchContext } from "../../context/SearchContext";
import CartWidget from "../CartWidget/CartWidget";
import SideCart from "../SideCart/SideCart";

import "./NavBar.css";

const NavBar = () => {

  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  return (
    <>
      <nav className="navbar">

        <Link to="/" className="logo-link">
          <h2 className="logo">TechStore</h2>
        </Link>

        <div className="nav-links">

          <NavLink to="/" end>Inicio</NavLink>

          <NavLink to="/category/laptops">Laptops</NavLink>

          <NavLink to="/category/celulares">Celulares</NavLink>

          <NavLink to="/category/accesorios">Accesorios</NavLink>

        </div>

        <CartWidget onClick={() => setIsCartOpen(true)} />

      </nav>

      <SideCart open={isCartOpen} close={() => setIsCartOpen(false)} />
    </>
  );

};

export default NavBar;