import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import Hero from "../Hero/Hero";
import ItemList from "../ItemList/ItemList";

import { db } from "../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { SearchContext } from "../../context/SearchContext";

const ItemListContainer = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();
  const { search, setSearch } = useContext(SearchContext);

  useEffect(() => {
    const productsRef = collection(db, "products");

    // Lógica para filtrar por categoría si existe el ID en la URL
    const q = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef;

    getDocs(q)
      .then(res => {
        const products = res.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(products);
      })
      .finally(() => setLoading(false));

  }, [categoryId]);

  const filteredProducts = products.filter(prod => 
    (prod.title || "").toLowerCase().includes((search || "").toLowerCase())
  );

  if (loading) return <h2 style={{textAlign: 'center', marginTop: '120px', color: '#888', fontFamily: 'var(--font-display)'}}>Cargando catálogo premium...</h2>;

  return (

    <>
      <Hero />
      
      <div className="search-container">
        <input
          className="main-search"
          placeholder="¿Qué estás buscando hoy?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="search-icon-bg">🔍</span>
      </div>

      <ItemList products={filteredProducts}/>
    </>

  );

};

export default ItemListContainer;