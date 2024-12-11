import { Container, Row } from 'reactstrap';
import '@styles/content-wrapper.css';

function ContentWrapper(props) {
  return (
    <>
      <Container className='content-wrapper mt-5 mb-4 p-4' fluid='sm'>
        <Row className='justify-content-center'>{props.children}</Row>
      </Container>
      <br />
    </>
  );
}

export default ContentWrapper;
