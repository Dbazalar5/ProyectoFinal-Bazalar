import { createContext, useState } from "react";

// Crear el contexto del carrito
export const CartContext = createContext();

// Proveedor del carrito para envolver la aplicación
export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]); // Estado del carrito (lista de productos)
  const [orderId, setOrderId] = useState(null); // ID de la orden generada en Firebase
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para abrir/cerrar el sidebar

  // Función para añadir productos al carrito
  const addItem = (item, quantity) => {

    const exist = cart.find(prod => prod.id === item.id);

    if (exist) {
      // Si el producto ya existe, actualizamos la cantidad
      const updatedCart = cart.map(prod =>
        prod.id === item.id
          ? { ...prod, quantity: prod.quantity + quantity }
          : prod
      );
      setCart(updatedCart);
    } else {
      // Si es nuevo, lo agregamos a la lista
      setCart([...cart, { ...item, quantity }]);
    }
  };

  // Función para eliminar un producto por ID
  const removeItem = (id) => {
    setCart(cart.filter(prod => prod.id !== id));
  };

  // Función para vaciar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Obtener la cantidad total de unidades en el carrito
  const totalItems = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity, 0);
  };

  // Calcular el precio total de la compra
  const totalPrice = () => {
    return cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        orderId,
        setOrderId,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};