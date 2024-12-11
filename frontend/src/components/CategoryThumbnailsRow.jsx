import { Container, Row } from 'reactstrap';
import CategoryThumbnailElement from '@components/CategoryThumbnailElement';
import '@styles/category-thumbnails-row.css';

import roeDeerImg from '@assets/images/categories/roe-deer.webp';
import wildBoarImg from '@assets/images/categories/wild-boar.webp';
import predatorsImg from '@assets/images/categories/predators.webp';
import redDeerImg from '@assets/images/categories/red-deer.webp';
import skinsImg from '@assets/images/categories/skins.webp';
import othersImg from '@assets/images/categories/others.webp';

function CategoryThumbNailsRow() {
  return (
    <Container className="category-picker-container mt-4" fluid>
      <Container fluid="md">
        <Row className="py-2">
          <CategoryThumbnailElement
            urlPath="products/roe-deer"
            img={roeDeerImg}
            titleKey="transl.category.title.roe.deer"
          />
          <CategoryThumbnailElement
            urlPath="products/wild-boar"
            img={wildBoarImg}
            titleKey="transl.category.title.wild.boar"
          />
          <CategoryThumbnailElement
            urlPath="products/predators"
            img={predatorsImg}
            titleKey="transl.category.title.predators"
          />
          <CategoryThumbnailElement
            urlPath="products/red-deer"
            img={redDeerImg}
            titleKey="transl.category.title.red.deer"
          />
          <CategoryThumbnailElement
            urlPath="products/skins"
            img={skinsImg}
            titleKey="transl.category.title.skins"
          />
          <CategoryThumbnailElement
            urlPath="products/others"
            img={othersImg}
            titleKey="transl.category.title.others"
          />
        </Row>
      </Container>
    </Container>
  );
}

export default CategoryThumbNailsRow;
