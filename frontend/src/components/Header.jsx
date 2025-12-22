import { Container, Row, Col } from 'reactstrap';
import Logo from '@assets/images/logo.avif'

function Header() {
  return (
  <Container fluid='sm'>
    <Row>
      <Col>
        <img className='m-4' src={Logo} alt='Taxidermy Poland Logo' width='40%'/>
      </Col>
    </Row>
  </Container>
  );
}

export default Header;