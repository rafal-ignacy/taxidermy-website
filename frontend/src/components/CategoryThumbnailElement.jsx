import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useContext } from 'react';
import { LanguageContext } from '@src/App';
import { translation } from '@utils/Helpers';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '@styles/category-thumbnail-element.css';

function CategoryThumbnailElement(props) {
  const { language } = useContext(LanguageContext);

  return (
    <Col
      className="category-col px-4"
      xs="6"
      sm="4"
      lg="2"
      tag={Link}
      to={props.urlPath}
    >
      <div className="category-img">
        <LazyLoadImage
          className="img-fluid rounded category-img"
          effect="blur"
          src={props.img}
          alt={translation(language, props.titleKey)}
        />
        <div className="category-overlay">
          <div className="category-title">
            {translation(language, props.titleKey)}
          </div>
        </div>
      </div>
    </Col>
  );
}

export default CategoryThumbnailElement;
