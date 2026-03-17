import { useState } from "react";
import "./ItemCount.css";

const ItemCount = ({ stock, initial, onAdd }) => {

  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (

    <div className="counter-container">

      <div className="counter-controls">
        <button onClick={decrement} className="count-btn" disabled={count <= 1}>-</button>
        <span className="count-display">{count}</span>
        <button onClick={increment} className="count-btn" disabled={count >= stock}>+</button>
      </div>

      <button 
        className="add-to-cart-btn" 
        onClick={() => onAdd(count)}
        disabled={stock === 0}
      >
        {stock === 0 ? "Sin Stock" : "Agregar al carrito"}
      </button>

    </div>

  );

};

export default ItemCount;