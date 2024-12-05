import Item from './Item';
import { Row, Col } from 'react-bootstrap';

const ItemList = ({ items }) => {
  return (
    <Row>
      {items.map((item) => (
        <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
          <Item item={item} />
        </Col>
      ))}
    </Row>
  );
};

export default ItemList;
