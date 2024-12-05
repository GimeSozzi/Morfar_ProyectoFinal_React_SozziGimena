import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import CartWidget from './CartWidget';
import Brand from './Brand';
import ButtonCategory from './ButtonCategory';
import './NavBar.css';

function NavBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const itemsCollection = collection(db, 'items');
        const querySnapshot = await getDocs(itemsCollection);

        // Extraer categorías únicas
        const fetchedCategories = [...new Set(querySnapshot.docs.map((doc) => doc.data().category))];
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          <Brand />
        </Link>
        <Nav className="justify-content-center flex-grow-1">
          {categories.length > 0 ? (
            categories.map((category) => <ButtonCategory key={category} categoryName={category} />)
          ) : (
            <p>Cargando categorías...</p>
          )}
        </Nav>
        <CartWidget />
      </Container>
    </Navbar>
  );
}

export default NavBar;
