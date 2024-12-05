import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import ItemList from './ItemList';

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const itemsCollection = collection(db, 'items');
        let q;

        if (categoryId) {
          const normalizedCategoryId = categoryId.charAt(0).toUpperCase() + categoryId.slice(1).toLowerCase();
          q = query(itemsCollection, where('category', '==', normalizedCategoryId));
        } else {
          q = itemsCollection;
        }

        const querySnapshot = await getDocs(q);
        const fetchedItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h2 className="category-title">
        {categoryId ? `Categoría: ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1).toLowerCase()}` : greeting}
      </h2>{' '}
      {items.length > 0 ? <ItemList items={items} /> : <p>No hay productos en esta categoría.</p>}
    </div>
  );
};

export default ItemListContainer;
