import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { saveOrder, createOrderObject, validateStock, updateStock } from '../services/ordersService';
import Swal from 'sweetalert2';
import './Checkout.css';

const Checkout = () => {
  const { cartList, calcTotalPrice, clearWithoutConfirmation } = useContext(CartContext);
  const [buyer, setBuyer] = useState({ name: '', phone: '', email: '', confirmEmail: '' });
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!buyer.name || !buyer.phone || !buyer.email || !buyer.confirmEmail) {
      setError('Por favor completa todos los campos.');
      return false;
    }
    if (buyer.email !== buyer.confirmEmail) {
      setError('Los emails no coinciden.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setIsProcessing(true); // Deshabilitar el botón al inicio del proceso

    try {
      // Validar stock
      await validateStock(cartList);

      // Crear la orden
      const order = createOrderObject(cartList, calcTotalPrice(), buyer);

      // Guardar la orden en Firestore
      const orderId = await saveOrder(order);

      // Actualizar stock en Firestore
      await updateStock(cartList);

      // Vaciar carrito sin confirmación
      clearWithoutConfirmation();

      // Mostrar mensaje de éxito con SweetAlert
      Swal.fire({
        title: '¡Compra realizada con éxito!',
        text: `Tu número de orden es: ${orderId}`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#28a745',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Error al procesar la compra:', error.message);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al procesar tu compra. Intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setIsProcessing(false); // Rehabilitar el botón si ocurre un error
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cartList.length === 0 ? (
        <div>
          <p>Tu carrito está vacío.</p>
          <button onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
      ) : (
        <div>
          <h3>Resumen de compra</h3>
          <ul className="checkout-items">
            {cartList.map((item) => (
              <li key={item.id}>
                {item.title} x {item.quantity} - ${item.price * item.quantity}
                {item.customOption && (
                  <p className="custom-option">
                    <strong>Opción seleccionada:</strong> {item.customOption}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: ${calcTotalPrice()}</strong>
          </p>
          <h3>Datos del comprador</h3>
          <form className="checkout-form">
            <input type="text" name="name" placeholder="Nombre completo" value={buyer.name} onChange={handleInputChange} />
            <input type="text" name="phone" placeholder="Teléfono" value={buyer.phone} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={buyer.email} onChange={handleInputChange} />
            <input type="email" name="confirmEmail" placeholder="Confirmar Email" value={buyer.confirmEmail} onChange={handleInputChange} />
            {error && <p className="error-message">{error}</p>}
            <button
              type="button"
              onClick={handleCheckout}
              className="checkout-button"
              disabled={isProcessing} // Deshabilitar el botón durante el procesamiento
            >
              {isProcessing ? 'Procesando...' : 'Realizar Compra'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
