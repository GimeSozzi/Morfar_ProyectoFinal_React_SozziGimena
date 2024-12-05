import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import './CartWidget.css';

const CartWidget = () => {
  const { calcItemsQty } = useContext(CartContext);

  const totalItems = calcItemsQty();

  // Ocultar el ícono si no hay productos
  if (totalItems === 0) return null;

  return (
    <Link to="/cart" className="cart-widget">
      <FaCartShopping size={40} />
      <span className="cart-badge">{totalItems}</span>
    </Link>
  );
};

export default CartWidget;
