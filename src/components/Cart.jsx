import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Cart.css';
import { validateStock, updateStock, saveOrder, createOrderObject } from '../services/ordersService';

const Cart = () => {
  const { cartList, removeItem, clear, calcItemsQty, updateItemQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalPrice = cartList.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) return <p>Cargando carrito...</p>;

  return (
    <div className="cart-page">
      <h2>Carrito de Compras</h2>
      {cartList.length === 0 ? (
        <>
          <p className="empty-cart-message">Tu carrito está vacío por ahora.</p>
          <button className="add-more-button" onClick={() => navigate('/')}>
            Agregar más productos
          </button>
        </>
      ) : (
        <>
          <ul className="cart-list">
            {cartList.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.title}</p>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateItemQuantity(item.id, Math.max(item.quantity - 1, 1))}>-</button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(item.id, Math.min(item.quantity + 1, item.stock))}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-item-price">Precio unitario: ${item.price}</p>
                  <p className="cart-item-total">Total: ${item.price * item.quantity}</p>
                </div>
                <button className="remove-button" onClick={() => removeItem(item.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <p className="cart-total-price">Total de la compra: ${totalPrice}</p>
          <div className="cart-actions">
            <button className="clear-cart-button" onClick={clear}>
              Vaciar carrito
            </button>
            <button className="add-more-button">
              <Link to="/" className="link-inside-button">
                Agregar más productos
              </Link>
            </button>
            <button className="green-button">
              <Link to="/checkout" className="link-inside-button">
                Finalizar compra
              </Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
