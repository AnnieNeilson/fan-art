import React from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image"
import noResults from "../assets/no-results.png";
import styles from "../styles/PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div>
      <Container className={styles.Content}>
        <h1>Page Not Found!</h1>
        <Image src={noResults} alt="Page Not Found"/>
        <h5>*jedi hand wave* this is not the page you're looking for</h5>
      </Container>
    </div>
  );
};

export default PageNotFound;
