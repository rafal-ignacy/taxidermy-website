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
          alt={props.title ? `${props.title} - Image ${index + 1}` : `Taxidermy specimen - Image ${index + 1}`}
        />
      </CarouselItem>
    );
  });

  function formatDimensionValue(value) {
    if (Array.isArray(value) && value.length === 2) {
      // Range: [min, max]
      return `${value[0]} - ${value[1]}`;
    }
    return value;
  }

  function formatInchValue(value) {
    if (Array.isArray(value) && value.length === 2) {
      // Range: convert both values to inches
      const minInch = (value[0] / 2.54).toFixed(1);
      const maxInch = (value[1] / 2.54).toFixed(1);
      const formattedMin = minInch.endsWith('.0') ? minInch.slice(0, -2) : minInch;
      const formattedMax = maxInch.endsWith('.0') ? maxInch.slice(0, -2) : maxInch;
      return `${formattedMin} - ${formattedMax}`;
    }
    let inchValue = (value / 2.54).toFixed(1);
    return inchValue.endsWith('.0') ? inchValue.slice(0, -2) : inchValue;
  }

  function generateDescription(descriptionTemplate, dimensions) {
    let description = descriptionTemplate;

    // Replace cm values: {width-cm}, {height-cm}, {depth-cm}, {shieldWidth-cm}, {shieldHeight-cm}
    description = description.replace(/{(\w+)-cm}/g, (match, key) => {
      const value = dimensions[key];
      if (value === undefined || value === null) {
        return match;
      }
      return formatDimensionValue(value);
    });

    // Replace inch values: {width-inch}, {height-inch}, {depth-inch}, {shieldWidth-inch}, {shieldHeight-inch}
    description = description.replace(/{(\w+)-inch}/g, (match, key) => {
      const value = dimensions[key];
      if (value === null || value === undefined) {
        return match;
      }
      return formatInchValue(value);
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
            {props.images.length > 1 && (
              <>
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
              </>
            )}
          </Carousel>
          <CardBody>
            <CardTitle
              tag="h5"
              dangerouslySetInnerHTML={{
                __html: props.title,
              }}
            />
            {props.dimensions && (
              <CardText
                dangerouslySetInnerHTML={{
                  __html: generateDescription(
                    props.descriptionTemplate,
                    props.dimensions
                  ),
                }}
              />
            )}
            <CardTitle className="price-title" tag="h5">
              {(() => {
                let priceDisplay = '';
                const exchangeRate = props.currencyExchangeRate || props.exchangeRate || 1;
                
                if (Array.isArray(props.price) && props.price.length === 2) {
                  // Price range
                  const minPrice = Math.round(props.price[0] * exchangeRate);
                  const maxPrice = Math.round(props.price[1] * exchangeRate);
                  priceDisplay = `${minPrice} - ${maxPrice}`;
                } else {
                  // Single price
                  priceDisplay = Math.round(props.price * exchangeRate);
                }
                return props.priceTitle + ': ' + priceDisplay + ' ' + props.currency;
              })()}
            </CardTitle>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default ItemCard;
