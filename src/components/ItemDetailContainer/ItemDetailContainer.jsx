import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () => {

  const [product, setProduct] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    // Referencia al documento específico en Firestore
    const docRef = doc(db, "products", itemId);

    getDoc(docRef).then(res => {
      setProduct({
        id: res.id,
        ...res.data()
      });
    });

  }, [itemId]);

  if (!product) return <h2>Cargando detalle...</h2>;

  return <ItemDetail {...product} />;

};

export default ItemDetailContainer;