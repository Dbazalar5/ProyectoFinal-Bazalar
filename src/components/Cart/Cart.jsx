import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import OrderSuccess from "../OrderSuccess/OrderSuccess";
import "./Cart.css";

const Cart = () => {

  const { cart, removeItem, clearCart, totalPrice, orderId, setOrderId } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  if (orderId) {
    return <OrderSuccess orderId={orderId} />;
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="continue-shopping">Volver a la tienda</Link>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="cart-container">
        <div className="cart-left">
          <button className="clear-cart" onClick={() => setShowCheckout(false)} style={{marginBottom: '20px', background: '#eee', color: '#333'}}>
            ← Volver al carrito
          </button>
          <CheckoutForm />
        </div>
        <div className="cart-right">
          <h2>Resumen</h2>
          <hr />
          <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
              <span>Total a pagar:</span>
              <strong>${totalPrice()}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className="cart-container">

      <div className="cart-left">
        <h1>Tu carrito</h1>

        {cart.map(prod => (

          <div key={prod.id} className="sidecart-item" style={{borderBottom: '1px solid #eee', padding: '15px 0'}}>
            
            <img src={prod.image} alt={prod.title} style={{width: '80px', borderRadius: '8px'}} />

            <div style={{flex: 1, marginLeft: '15px'}}>

              <h3>{prod.title}</h3>

              <p>Cantidad: {prod.quantity}</p>

              <p>Precio unitario: ${prod.price}</p>

              <p style={{fontWeight: 'bold', color: 'var(--accent)'}}>Subtotal: ${prod.price * prod.quantity}</p>

            </div>

            <button onClick={()=>removeItem(prod.id)} className="clear-cart" style={{background: '#ff4d4d', height: 'fit-content'}}>
              Eliminar
            </button>

          </div>

        ))}

        <button onClick={clearCart} className="clear-cart">
          Vaciar Carrito
        </button>
      </div>

      <div className="cart-right">
        <h2>Resumen</h2>
        <hr />
        <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
            <span>Total:</span>
            <strong>${totalPrice()}</strong>
        </div>
        <button className="continue-shopping" style={{width: '100%', border: 'none', cursor: 'pointer'}} onClick={() => setShowCheckout(true)}>
          Finalizar Compra
        </button>
      </div>

    </div>

  );

};

export default Cart;