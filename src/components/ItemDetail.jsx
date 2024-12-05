// import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
// import ItemCount from './ItemCount';
// import './ItemDetail.css';

// const ItemDetail = ({ item }) => {
//   const [quantityAdded, setQuantityAdded] = useState(0);
//   const { addToCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const handleAdd = (quantity) => {
//     setQuantityAdded(quantity);
//     addToCart(item, quantity);
//   };

//   const handleFinishPurchase = () => {
//     navigate('/cart');
//   };

//   if (!item) return <p>Cargando producto...</p>;

//   return (
//     <div className="item-detail">
//       <img src={item.image} alt={item.title} className="item-detail-image" />
//       <h2 className="item-detail-title">{item.title}</h2>
//       <p className="item-detail-description">{item.description}</p>
//       <p className="item-detail-price">Precio: ${item.price}</p>
//       <p className="item-detail-stock">Stock disponible: {item.stock} unidades</p>

//       {quantityAdded === 0 ? (
//         <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} />
//       ) : (
//         <>
//           <p className="success-message">{quantityAdded} producto(s) agregado(s) al carrito.</p>
//           <button className="go-to-cart-button" onClick={handleFinishPurchase}>
//             Terminar mi compra
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ItemDetail;

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ItemCount from './ItemCount';
import './ItemDetail.css';

const ItemDetail = ({ item }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const [customOption, setCustomOption] = useState('común'); // Estado para la opción personalizada
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAdd = (quantity) => {
    setQuantityAdded(quantity);
    addToCart({ ...item, customOption }, quantity); // Añadimos customOption al producto
  };

  const handleFinishPurchase = () => {
    navigate('/cart');
  };

  const handleOptionChange = (e) => {
    setCustomOption(e.target.value); // Actualizamos la opción seleccionada
  };

  if (!item) return <p>Cargando producto...</p>;

  // Determinar si el producto necesita opciones personalizadas
  const getCustomOptions = () => {
    if (item.category === 'Comidas' || item.category === 'Postres') {
      return ['común', 'sin tacc'];
    } else if (item.category === 'Bebidas' && item.title.toLowerCase().includes('gaseosa')) {
      return ['común', 'sin azúcar'];
    } else if (item.category === 'Cafeteria' && item.title.toLowerCase().includes('café con leche')) {
      return ['común', 'vegano'];
    }
    return null;
  };

  const options = getCustomOptions();

  return (
    <div className="item-detail">
      <img src={item.image} alt={item.title} className="item-detail-image" />
      <h2 className="item-detail-title">{item.title}</h2>
      <p className="item-detail-description">{item.description}</p>
      <p className="item-detail-price">Precio: ${item.price}</p>
      <p className="item-detail-stock">Stock disponible: {item.stock} unidades</p>

      {/* Opciones personalizadas */}
      {options && (
        <div className="custom-options">
          <label htmlFor="custom-option">Selecciona una opción:</label>
          <select id="custom-option" value={customOption} onChange={handleOptionChange} className="custom-option-select">
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {quantityAdded === 0 ? (
        <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} />
      ) : (
        <>
          <p className="success-message">{quantityAdded} producto(s) agregado(s) al carrito.</p>
          <button className="go-to-cart-button" onClick={handleFinishPurchase}>
            Terminar mi compra
          </button>
        </>
      )}
    </div>
  );
};

export default ItemDetail;
