import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useCurrentUser } from "../../contexts/CurrentUserContexts";
import styles from "../../styles/Profile.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Assets";
import { useParams } from "react-router-dom/";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import PopularProfiles from "./PopularProfiles";
import InfiniteScroll from "react-infinite-scroll-component";
import noResults from "../../assets/no-results.png";
import { fetchMoreData } from "../../utils/utils";
import Post from "../posts/Post";
import PopularPosts from "../posts/PopularPosts";
import DiscussedPosts from "../posts/DiscussedPosts";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.user === profile?.owner;
  const [profilePosts, setProfilePosts] = useState({ results: [] });
const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);

        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
        if (err.code === "ERR_BAD_REQUEST") {
          history.push("/error");
        }
       
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner && (
        <ProfileEditDropdown id={profile?.id} className={styles.Dropdown} />
      )}
      <Row className="h-100 text-center">
        <Col lg={3}>
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h1>{profile?.owner}</h1>
          <p>
            <i className={`far fa-calendar ${appStyles.IdleIcon}`} />
            Joined: {profile?.created_at}
          </p>

          <Row className="text-center">
            <Col className="my-2" xs={4}>
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col className="my-2" xs={4}>
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>

            <Col className="my-2" xs={4}>
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>

          <Row>
            <Col>
              <hr />
              <div>{profile?.content}</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="align-self-center">
          {!profile?.is_owner &&
            currentUser &&
            (profile?.following_id ? (
              <Button
                className={btnStyles.Button}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={btnStyles.Button}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={noResults}
          message={`Looks like ${profile?.owner} hasn't posted yet!`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4}>
        <PopularProfiles />
        <PopularPosts />
        <DiscussedPosts />
      </Col>
    </Row>
  );
}

export default ProfilePage;
