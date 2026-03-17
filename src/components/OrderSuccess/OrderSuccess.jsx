import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./OrderSuccess.css";

const confettiData = [...Array(12)].map((_, i) => ({
  id: i,
  left: `${(i * 8.3) + (i % 2 === 0 ? 2 : -2)}%`,
  delay: `${i * 0.2}s`,
  color: ['#2ecc71', '#3498db', '#f1c40f', '#e74c3c'][i % 4]
}));

const OrderSuccess = ({ orderId }) => {

  const { setOrderId } = useContext(CartContext);

  return (

    <div className="order-success">

      <div className="confetti-container">
        {confettiData.map((c) => (
          <div key={c.id} className="confetti" style={{
            left: c.left,
            animationDelay: c.delay,
            backgroundColor: c.color
          }}></div>
        ))}
      </div>

      <div className="success-card">

        <div className="success-icon-wrapper">
          <span className="success-icon">✅</span>
        </div>

        <h1>¡Pedido en camino!</h1>

        <p>Gracias por confiar en nosotros. Hemos enviado los detalles de tu compra a tu correo electrónico.</p>

        <div className="order-box">
          <p className="order-id-label">Código de Seguimiento</p>
          <h2 className="order-id">{orderId}</h2>
          
          <div className="delivery-estimate">
            <span>🚚</span>
            <span>Entrega estimada: 3-5 días hábiles</span>
          </div>
        </div>

        <Link to="/" className="continue-shopping" onClick={() => setOrderId(null)}>
          Volver a la tienda
        </Link>

      </div>

    </div>

  );

};

export default OrderSuccess;