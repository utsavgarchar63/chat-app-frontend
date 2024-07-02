import Head from "next/head";
import RegisterForm from "../Auth/RegisterForm";
import { Container, Row, Col } from "react-bootstrap";
const Register = () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <svg
        className="wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#5000ca"
          fillOpacity="1"
          d="M0,128L48,106.7C96,85,192,43,288,32C384,21,480,43,576,74.7C672,107,768,149,864,144C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <Container fluid>
        <Row className="justify-content-center align-items-center vh-100">
          <div className="d-flex align-items-center justify-content-center vh-100">
            <Col xs={11} sm={8} md={6} lg={3}>
              <RegisterForm />
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Register;
