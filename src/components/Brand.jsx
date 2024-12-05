import { Navbar } from 'react-bootstrap';
import { MdFastfood } from 'react-icons/md';
import './Brand.css';

const Brand = () => {
  return (
    <Navbar.Brand className="custom-brand">
      morf.ar
      <MdFastfood className="brand-icon" />
    </Navbar.Brand>
  );
};

export default Brand;
