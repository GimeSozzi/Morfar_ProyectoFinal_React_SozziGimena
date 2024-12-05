import { Link } from 'react-router-dom';
import './ButtonCategory.css';

const ButtonCategory = ({ categoryName }) => {
  const route = `/category/${categoryName.toLowerCase()}`;

  return (
    <Link to={route} className="custom-nav-link">
      {categoryName}
    </Link>
  );
};

export default ButtonCategory;
