import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./ItemDetail.css";

const ItemDetail = ({ id, title, price, image, description, category, stock }) => {

  const { addItem, setIsCartOpen } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = { id, title, price, image, description, category, stock };

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setIsCartOpen(true);
  };

  return (

    <div className="detail-container">
      <div className="detail">

        <div className="detail-img">
          <img src={image} alt={title} />
        </div>

        <div className="detail-info">
          <div className="category-tag">{category}</div>
          <h2>{title}</h2>
          <p className="description">{description}</p>
          
          <div className="price-tag">
            <span>Precio:</span>
            <h3>${price}</h3>
          </div>

          {!added ? (
            <>
              <div className="stock-info">
                Stock disponible: <strong>{stock} unidades</strong>
              </div>

              <div className="detail-actions">
                <div className="qty-selector">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(stock, quantity + 1))}>+</button>
                </div>

                <button className="add-button" onClick={handleAdd}>
                  Añadir al carrito
                </button>
              </div>
            </>
          ) : (
            <div className="added-feedback">
                <div className="added-msg">✨ ¡Producto añadido con éxito!</div>
                <div className="post-add-actions">
                    <Link to="/cart" className="go-btn primary">Ir al Carrito</Link>
                    <Link to="/" className="go-btn secondary">Seguir comprando</Link>
                </div>
            </div>
          )}

          <p className="shipping-info">🚚 Envío gratuito a todo el país</p>

        </div>

      </div>
    </div>

  );

};

export default ItemDetail;