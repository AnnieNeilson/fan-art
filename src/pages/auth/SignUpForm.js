import React from "react";
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import image from "../../assets/signupform-vader.png";
import appStyles from "../../App.module.css";

const SignUpForm = () => {
  return (
    <div>
      <Row>
        <Col className="my-auto py-2 p-md-2" md={8}>
          <Container>
            <h1>Sign Up</h1>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <p className={styles.TextCenter}>Already have an account?<br></br>
              <Link className={styles.Link} to="/signin">
                Sign in
              </Link>
              </p>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Col>
        <Col className="my-auto d-none d-md-block p-2 " md={4}>
          <Container>
            <Image className={`${appStyles.FillerImage}`} src={image} />
            <h1 className={styles.TextCenter}>Join us!</h1>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpForm;
