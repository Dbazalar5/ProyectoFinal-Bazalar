// Para que este script funcione, debes crear un archivo .env en la raíz con tus credenciales.
// O pasar las variables directamente al ejecutarlo.

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import 'dotenv/config'; // Necesitas instalar dotenv: npm install dotenv

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
  // Laptops
  {
    title: "MacBook Air M3",
    price: 1299,
    category: "laptops",
    description: "La laptop más delgada y ligera de Apple, ahora superpotenciada por el chip M3. Hasta 18 horas de batería.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000",
    stock: 10
  },
  {
    title: "Dell XPS 13",
    price: 1100,
    category: "laptops",
    description: "Pantalla InfinityEdge de 13.4 pulgadas. Potencia y elegancia en un diseño de aluminio mecanizado.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1000",
    stock: 7
  },
  {
    title: "ASUS ROG Zephyrus G14",
    price: 1600,
    category: "laptops",
    description: "La laptop de gaming de 14 pulgadas más potente del mundo. Gráficos NVIDIA RTX 40-Series.",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1000",
    stock: 5
  },
  {
    title: "Lenovo Yoga Pro 9i",
    price: 1450,
    category: "laptops",
    description: "Diseñada para creadores. Pantalla PureSight Pro de 14.5 pulgadas y procesadores Intel Core de 13ra Gen.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000",
    stock: 8
  },
  // Celulares
  {
    title: "iPhone 15 Pro Max",
    price: 1199,
    category: "celulares",
    description: "Forjado en titanio. Chip A17 Pro. Botón de Acción personalizable. El sistema de cámaras más potente en un iPhone.",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1000",
    stock: 15
  },
  {
    title: "Samsung Galaxy S24 Ultra",
    price: 1299,
    category: "celulares",
    description: "Galaxy AI ha llegado. Pantalla plana de 6.8 pulgadas con S Pen integrado y cámara de 200MP.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=1000",
    stock: 12
  },
  {
    title: "Google Pixel 8 Pro",
    price: 999,
    category: "celulares",
    description: "La mejor cámara de Google con IA avanzada. Pantalla Actua superbrillante y chip Google Tensor G3.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=1000",
    stock: 10
  },
  {
    title: "Nothing Phone (2)",
    price: 649,
    category: "celulares",
    description: "Un diseño icónico con la Interfaz Glyph mejorada. Rendimiento de nivel flagship y cámara dual de 50MP.",
    image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=1000",
    stock: 20
  },
  // Accesorios
  {
    title: "AirPods Pro (2da Gen)",
    price: 249,
    category: "accesorios",
    description: "Cancelación Activa de Ruido hasta 2 veces mejor. Audio Espacial personalizado y estuche de carga MagSafe.",
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&q=80&w=1000",
    stock: 25
  },
  {
    title: "Sony WH-1000XM5",
    price: 399,
    category: "accesorios",
    description: "Líder en cancelación de ruido. Ocho micrófonos y procesador Auto NC Optimizer para llamadas ultra claras.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
    stock: 15
  },
  {
    title: "Logitech MX Master 3S",
    price: 99,
    category: "accesorios",
    description: "El ratón icónico reinventado. Desplazamiento MagSpeed ultra rápido y sensor de 8,000 DPI que funciona en cristal.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=1000",
    stock: 30
  },
  {
    title: "Keychron K2 Wireless",
    price: 89,
    category: "accesorios",
    description: "Teclado mecánico inalámbrico compacto al 75%. Retroiluminación RGB y compatibilidad total con Mac y Windows.",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1000",
    stock: 20
  }
];

const seedDatabase = async () => {
  try {
    console.log("🚀 Iniciando siembra de datos...");
    
    // 1. Limpiar colección actual (opcional pero recomendado para no duplicar)
    const querySnapshot = await getDocs(collection(db, "products"));
    console.log(`🗑️ Eliminando ${querySnapshot.size} productos antiguos...`);
    
    const deletePromises = querySnapshot.docs.map(docSnapshot => 
      deleteDoc(doc(db, "products", docSnapshot.id))
    );
    await Promise.all(deletePromises);

    // 2. Cargar nuevos productos
    console.log("📤 Cargando nuevos productos profesionales...");
    const addPromises = products.map(product => 
      addDoc(collection(db, "products"), product)
    );
    await Promise.all(addPromises);

    console.log("✅ ¡Base de datos sembrada con éxito!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al sembrar la base de datos:", error);
    process.exit(1);
  }
};

seedDatabase();
