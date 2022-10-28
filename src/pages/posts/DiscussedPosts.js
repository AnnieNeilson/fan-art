import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularPosts.module.css";
import { Accordion, Button, Container, Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContexts";

import Asset from "../../components/Assets";

import { Link } from "react-router-dom";

const DiscussedPosts = () => {
  const [posts, setPosts] = useState({
    discussedPosts: { results: [] },
  });
  const { discussedPosts } = posts;
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const [isClicked, setIsClicked] = useState(false);


  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?ordering=-comments_count`);
        setPosts((prevState) => ({
          ...prevState,
          discussedPosts: data,
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setIsClicked(true);
    setHasLoaded(false);
    const timer = setTimeout(() => {
      handleMount();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [currentUser]);

  return (
    <Container className={`${appStyles.Content} `}>
      <Accordion >
        <h3>
          Hot Topics
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="0"
            className={styles.ToggleButton}
          >
            {" "}
            <i
              onClick={() => setIsClicked((prev) => !prev)}
              className={isClicked ? "fas fa-toggle-off" : "fas fa-toggle-on"}
            />
          </Accordion.Toggle>
        </h3>

        {hasLoaded ? (
          <>
            {discussedPosts.results.length ? (
              <>
               
                  <Accordion.Collapse eventKey="0">
                    <div className="text-center">
                      {discussedPosts.results.slice(0, 3).map((post) => (
                        <div className={appStyles.Content} key={post.id}>
                          <h4>{post.title}</h4>
                          <Link to={`/posts/${post.id}`}>
                            <Image
                              className={styles.ImagePreviews}
                              src={post.image}
                            />
                          </Link>
                          <hr />

                          <Link to={`/profiles/${post.profile_id}`}>
                            <h5>{post.owner}</h5>
                          </Link>

                          {post.comments_count}
                          <i className={`fas fa-comment ${appStyles.IdleIcon} `} />
                        </div>
                      ))}
                    </div>
                  </Accordion.Collapse>
               
              </>
            ) : (
              <Container className={appStyles.Content}>
                <p>No content</p>
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Accordion>
    </Container>
  );
};

export default DiscussedPosts;
