import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";

const products = [

{
title: "Laptop Gamer ASUS",
price: 3500,
stock: 10,
category: "laptops",
image: "https://picsum.photos/300?1",
description: "Laptop gamer RTX"
},

{
title: "Lenovo Thinkpad",
price: 2800,
stock: 5,
category: "laptops",
image: "https://picsum.photos/300?2",
description: "Laptop empresarial"
},

{
title: "MacBook Pro",
price: 5200,
stock: 4,
category: "laptops",
image: "https://picsum.photos/300?3",
description: "Laptop Apple"
},

{
title: "iPhone 14",
price: 4200,
stock: 7,
category: "celulares",
image: "https://picsum.photos/300?4",
description: "Smartphone Apple"
},

{
title: "Samsung Galaxy S23",
price: 3800,
stock: 9,
category: "celulares",
image: "https://picsum.photos/300?5",
description: "Android premium"
},

{
title: "Xiaomi Redmi Note",
price: 1200,
stock: 12,
category: "celulares",
image: "https://picsum.photos/300?6",
description: "Celular económico"
},

{
title: "Mouse Logitech",
price: 120,
stock: 25,
category: "accesorios",
image: "https://picsum.photos/300?7",
description: "Mouse inalámbrico"
},

{
title: "Teclado Mecánico RGB",
price: 250,
stock: 15,
category: "accesorios",
image: "https://picsum.photos/300?8",
description: "Teclado gamer"
},

{
title: "Audífonos Gamer",
price: 320,
stock: 14,
category: "accesorios",
image: "https://picsum.photos/300?9",
description: "Sonido envolvente"
},

{
title: "Monitor 27 pulgadas",
price: 1500,
stock: 8,
category: "accesorios",
image: "https://picsum.photos/300?10",
description: "Monitor Full HD"
}

];

export const loadProducts = async () => {

const productsRef = collection(db,"products");

for (let product of products){

await addDoc(productsRef,product);

}


};