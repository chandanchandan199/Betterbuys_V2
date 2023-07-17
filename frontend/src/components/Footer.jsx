import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container className="my-3">
      <Row>
        <Col className="text-center py-3 my-3">
          <p>Proshop &copy; {currentYear} </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
