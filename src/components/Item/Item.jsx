import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ id, title, price, image }) => {

  return (

    <div className="product-card">

      <div className="product-img">
        <img src={image} alt={title} />
      </div>

      <div className="product-content">
        <h3>{title}</h3>
        <p className="price">${price}</p>

        <Link to={`/item/${id}`} className="btn">
          Ver detalle
        </Link>
      </div>

    </div>

  );

};

export default Item;