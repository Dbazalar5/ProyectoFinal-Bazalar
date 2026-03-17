import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./CartItem.css";

const CartItem = ({id,title,price,quantity,image}) => {

const { removeItem } = useContext(CartContext)

return(

<div className="cart-item">

<img src={image} alt={title}/>

<div className="cart-info">

<h3>{title}</h3>

<p>Cantidad: {quantity}</p>

<p>${price*quantity}</p>

</div>

<button className="remove-btn" onClick={()=>removeItem(id)}>
Eliminar
</button>

</div>

)

}

export default CartItem