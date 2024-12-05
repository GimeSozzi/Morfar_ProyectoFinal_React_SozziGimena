import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ item }) => {
  return (
    <Card className="product-card mb-4">
      <Card.Img variant="top" src={item.image} alt={item.title} className="product-image" />
      <Card.Body className="product-body">
        <Card.Title className="product-title">{item.title}</Card.Title>
        <Card.Text className="product-price">Precio: ${item.price}</Card.Text>
        <Link to={`/item/${item.id}`}>
          <Button className="detail-button">Ver detalle</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Item;
