import { serverTimestamp, collection, addDoc, writeBatch, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// Guarda una orden en Firestore y devuelve el ID generado
export const saveOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), order);
    return docRef.id;
  } catch (error) {
    throw new Error('Error al guardar la orden: ' + error.message);
  }
};

// Crea el objeto de orden a partir del carrito, precio total e información del comprador
export const createOrderObject = (cartList, totalPrice, buyerInfo) => ({
  buyer: buyerInfo,
  items: cartList.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
  })),
  total: totalPrice,
  date: serverTimestamp(),
});

// Valida el stock de los productos en el carrito
export const validateStock = async (cartList) => {
  for (const item of cartList) {
    const itemRef = doc(db, 'items', item.id);
    const itemSnapshot = await getDoc(itemRef);

    if (!itemSnapshot.exists()) {
      throw new Error(`El producto con ID ${item.id} no existe.`);
    }

    const itemData = itemSnapshot.data();
    if (item.quantity > itemData.stock) {
      throw new Error(`El producto "${item.title}" no tiene suficiente stock.`);
    }
  }
};

// Actualiza el stock de los productos en Firestore
export const updateStock = async (cartList) => {
  const batch = writeBatch(db);

  for (const item of cartList) {
    const itemRef = doc(db, 'items', item.id);
    const itemSnapshot = await getDoc(itemRef);

    if (!itemSnapshot.exists()) {
      throw new Error(`El producto con ID ${item.id} no existe.`);
    }

    const itemData = itemSnapshot.data();
    const newStock = itemData.stock - item.quantity;

    batch.update(itemRef, { stock: newStock });
  }

  await batch.commit();
};
