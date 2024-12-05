import { useState } from 'react';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAdd = () => {
    if (stock > 0 && count <= stock) {
      onAdd(count);
    }
  };

  return (
    <div className="item-count">
      <button onClick={handleDecrement} disabled={count <= 1}>
        -
      </button>
      <span>{count}</span>
      <button onClick={handleIncrement} disabled={count >= stock}>
        +
      </button>
      <button onClick={handleAdd} disabled={stock === 0}>
        Agregar
      </button>
    </div>
  );
};

export default ItemCount;
