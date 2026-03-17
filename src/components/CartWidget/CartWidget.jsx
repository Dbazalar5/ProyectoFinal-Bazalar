import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = ({ onClick }) => {

  const { totalItems } = useContext(CartContext);

  return (

    <div className="cart-widget" onClick={onClick}>

      🛒 <span>{totalItems()}</span>

    </div>

  );

};

export default CartWidget;