import { createContext, useState } from "react";

// Contexto para manejar la búsqueda de productos
export const SearchContext = createContext();

// Proveedor del contexto de búsqueda
export const SearchProvider = ({ children }) => {

  const [search, setSearch] = useState(""); // Estado global de la barra de búsqueda

  return (
    <SearchContext.Provider value={{search, setSearch}}>
      {children}
    </SearchContext.Provider>
  );
};