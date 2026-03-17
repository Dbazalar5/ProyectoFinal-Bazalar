import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = ({ products }) => {

  return (

    <div className="container">

      <div className="products-grid">

        {products.map(prod => (
          <Item key={prod.id} {...prod}/>
        ))}

      </div>

    </div>

  );

};

export default ItemList;