import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./CheckoutForm.css";

const CheckoutForm = () => {
  const { cart, clearCart, setOrderId, totalPrice } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (formData.nombre.length < 3) newErrors.nombre = "Nombre demasiado corto";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
    if (formData.telefono.length < 7) newErrors.telefono = "Teléfono inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Estructura de la orden para Firebase
    const order = {
      buyer: formData,
      items: cart.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      total: totalPrice(),
      date: serverTimestamp() // Fecha del servidor de Google
    };

    try {
      // Guardar la orden en la colección 'orders'
      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id); // Guardar ID para mostrarlo en la pantalla de éxito
      clearCart(); // Limpiar carrito tras la compra
    } catch (error) {
      setErrors({ general: "Error al procesar tu pedido. Intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Datos de Envío</h2>
      
      {errors.general && <p className="error" style={{textAlign: 'center'}}>{errors.general}</p>}

      <div className="input-group">
        <input 
          name="nombre"
          placeholder="Nombre completo" 
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        {errors.nombre && <span className="error">{errors.nombre}</span>}
      </div>

      <div className="input-group">
        <input 
          name="email"
          type="email"
          placeholder="Correo electrónico" 
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="input-group">
        <input 
          name="telefono"
          placeholder="Teléfono móvil" 
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        {errors.telefono && <span className="error">{errors.telefono}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <span>Procesando pedido...</span>
          </div>
        ) : (
          "Confirmar mi pedido"
        )}
      </button>
      
      <p className="security-note">🔒 Pago 100% seguro y encriptado</p>
    </form>
  );
};

export default CheckoutForm;