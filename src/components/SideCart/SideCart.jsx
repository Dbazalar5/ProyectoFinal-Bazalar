import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

import "./SideCart.css";

const SideCart = ({ open, close }) => {

  const { cart, totalPrice, addItem, removeItem } = useContext(CartContext);

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      addItem(item, -1);
    } else {
      removeItem(item.id);
    }
  };

  return (

    <div className={`sidecart-overlay ${open ? "active" : ""}`} onClick={close}>

      <div className="sidecart" onClick={(e)=>e.stopPropagation()}>

        <div className="sidecart-header">

          <h2>Carrito</h2>

          <button onClick={close}>✖</button>

        </div>

        <div className="sidecart-items">

          {cart.length === 0 ? (

            <p className="empty-msg">Tu carrito está vacío</p>

          ) : (

            cart.map(item => (

              <div key={item.id} className="sidecart-item">

                <img src={item.image} alt={item.title} />

                <div className="item-info">

                  <h4>{item.title}</h4>

                  <div className="qty-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addItem(item, 1)}>+</button>
                  </div>

                  <p className="item-price">${item.price * item.quantity}</p>

                </div>

                <button className="remove-item" onClick={() => removeItem(item.id)}>✕</button>

              </div>

            ))

          )}

        </div>

        <div className="sidecart-footer">

          <div className="total-section">
            <span>Total:</span>
            <strong>${totalPrice()}</strong>
          </div>

          <Link to="/cart" className="go-to-cart" onClick={close}>
            Ir al carrito
          </Link>

        </div>

      </div>

    </div>

  );

};

export default SideCart;