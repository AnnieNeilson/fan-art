import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularPosts.module.css";
import { Container, Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContexts";

import Asset from "../../components/Assets";

import { Link } from "react-router-dom";

const PopularPosts = () => {
  const [posts, setPosts] = useState({
    popularPosts: { results: [] },
  });
  const { popularPosts } = posts;
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?ordering=-likes_count`);
        setPosts((prevState) => ({
          ...prevState,
          popularPosts: data,
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      handleMount();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [currentUser]);

  return (
    <Container className={appStyles.Content}>
      <h2>Popular Posts</h2>
      {hasLoaded ? (
        <>
          {popularPosts.results.length ? (
            <div className="text-center">
              {popularPosts.results.slice(0, 4).map((post) => (
                <div className={appStyles.Content} key={post.id}>
                  <h4>{post.title}</h4>
                  <Link to={`/posts/${post.id}`}>
                    <Image className={styles.ImagePreviews} src={post.image} />
                  </Link>
                  <hr />

                  <Link to={`/profiles/${post.profile_id}`}>
                    <h5>{post.owner}</h5>
                  </Link>

                  {post.likes_count}
                  <i className={`fas fa-heart ${styles.Disabled} `} />
                </div>
              ))}
            </div>
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
    </Container>
  );
};

export default PopularPosts;
