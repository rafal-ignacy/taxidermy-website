import { useState, useRef } from 'react';
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Carousel,
  CarouselControl,
  CarouselItem,
} from 'reactstrap';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '@styles/item-card.css';

function ItemCard(props) {
  const [open, setOpen] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const ref = useRef(null);

  const next = () => {
    const nextIndex =
      activeImgIndex === props.images.length - 1 ? 0 : activeImgIndex + 1;
    setActiveImgIndex(nextIndex);
  };

  const prev = () => {
    const prevIndex =
      activeImgIndex === 0 ? props.images.length - 1 : activeImgIndex - 1;
    setActiveImgIndex(prevIndex);
  };

  const slides = props.images.map((item, index) => {
    return (
      <CarouselItem key={index}>
        <LazyLoadImage
          className="img-fluid rounded-top img-card"
          effect="blur"
          onClick={() => setOpen(true)}
          src={item.thumbnail}
        />
      </CarouselItem>
    );
  });

  function generateDescription(descriptionTemplate, dimensions) {
    let cmIndex = 0;
    let inchIndex = 0;

    let description = descriptionTemplate
      .replace(/{dimension(\d+)-cm}/g, () => dimensions[cmIndex++])
      .replace(/{dimension(\d+)-inch}/g, () => {
        let inchValue = (dimensions[inchIndex++] / 2.54).toFixed(1);
        return inchValue.endsWith('.0') ? inchValue.slice(0, -2) : inchValue;
      });
    return description;
  }

  return (
    <>
      <Lightbox
        controller={ref}
        on={{
          view: ({ index: currentIndex }) => setActiveImgIndex(currentIndex),
        }}
        index={activeImgIndex}
        open={open}
        close={() => setOpen(false)}
        slides={props.images}
        plugins={[Zoom, Captions]}
        onIndexChange={setActiveImgIndex}
      />
      <Col className="item-card-wrapper mb-3" lg="3" md="4" xs="6">
        <Card className="item-card">
          <Carousel
            activeIndex={activeImgIndex}
            next={next}
            previous={prev}
            interval={false}
          >
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={prev}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
            />
          </Carousel>
          <CardBody>
            <CardTitle tag="h6">
              <span className="text-danger">
                {props.idTitle + ': ' + props.id}
              </span>
            </CardTitle>
            <CardTitle
              tag="h5"
              dangerouslySetInnerHTML={{
                __html: props.title,
              }}
            />
            <CardText
              dangerouslySetInnerHTML={{
                __html: generateDescription(
                  props.descriptionTemplate,
                  props.dimensions
                ),
              }}
            />
            <CardTitle className="price-title" tag="h5">
              {props.priceTitle +
                ': ' +
                (!props.currencyExchangeRate ? Math.round(props.price * props.exchangeRate) : ' ') +
                ' ' +
                props.currency}
            </CardTitle>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default ItemCard;
