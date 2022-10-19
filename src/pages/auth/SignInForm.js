import React, { useState } from "react";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import image from "../../assets/signinform-image.png";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { username, password } = signInData;

  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("dj-rest-auth/login/", signInData);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      <Row>
        <Col className="my-auto d-none d-md-block p-2 " md={4}>
          <Container>
            <Image className={`${appStyles.FillerImage}`} src={image} />
            <h1 className={styles.TextCenter}>Welcome back!</h1>
          </Container>
        </Col>
        <Col className="my-auto py-2 p-md-2" md={8}>
          <Container className={styles.Center}>
            <h1 className={styles.Header}>Sign In</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert variant="danger" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password">
                <Form.Label className="d-none">password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert variant="danger" key={idx}>
                  {message}
                </Alert>
              ))}
              <p>
                Don't have an account yet?<br></br>
                <Link className={styles.Link} to="/signup">
                  Sign up
                </Link>
              </p>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                type="submit">
                Sign In
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="danger" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default SignInForm;
