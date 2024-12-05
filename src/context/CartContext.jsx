import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState(() => {
    const storedCart = localStorage.getItem('cartList');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);

  const addToCart = (item, quantity) => {
    if (!item || !item.id) {
      toast.error('Error al agregar el producto al carrito.');
      return;
    }

    const existingItem = cartList.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cartList.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem));
      setCartList(updatedCart);
    } else {
      setCartList([...cartList, { ...item, quantity }]);

      toast.success(`${item.title} agregado al carrito. Cantidad: ${quantity}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        style: {
          backgroundColor: '#ff4757',
          color: 'white',
        },
      });
    }
  };

  const removeItem = (id) => {
    const item = cartList.find((cartItem) => cartItem.id === id);

    if (item) {
      Swal.fire({
        title: 'Eliminar producto',
        text: `¿Estás seguro de eliminar ${item.title} del carrito?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#ff4757',
        cancelButtonColor: '#333333',
      }).then((result) => {
        if (result.isConfirmed) {
          setCartList(cartList.filter((cartItem) => cartItem.id !== id));
          Swal.fire({
            title: 'Producto eliminado',
            text: `${item.title} fue eliminado del carrito.`,
            icon: 'success',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#ff4757',
          });
        }
      });
    }
  };

  const clear = () => {
    Swal.fire({
      title: 'Vaciar carrito',
      text: '¿Estás seguro de vaciar todo el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff4757',
      cancelButtonColor: '#333333',
    }).then((result) => {
      if (result.isConfirmed) {
        setCartList([]);
        Swal.fire({
          title: 'Carrito vaciado',
          text: 'Todos los productos fueron eliminados.',
          icon: 'success',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#ff4757',
        });
      }
    });
  };

  const clearWithoutConfirmation = () => {
    setCartList([]);
  };

  const isInCart = (id) => cartList.some((cartItem) => cartItem.id === id);

  const calcItemsQty = () => cartList.reduce((total, item) => total + item.quantity, 0);

  const calcTotalPrice = () => cartList.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateItemQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setCartList((prevCartList) => prevCartList.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        removeItem,
        clear,
        clearWithoutConfirmation,
        isInCart,
        calcItemsQty,
        calcTotalPrice,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
