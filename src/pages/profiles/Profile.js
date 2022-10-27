import React, { useRef, useState } from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContexts";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";


const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const {handleFollow, handleUnfollow} = useSetProfileData()
 
  return (
    <>
      <div
        className={`my-3 d-flex align-items-center ${mobile && "flex-column"} `}
      >
        <div className="align-self-center">         
 
        <Avatar src={image}  />

        </div>
        <div className={`mx-2 ${styles.WordBreak}`}>
          <Link to={`/profiles/${id}`}>
            <strong>{owner}</strong>
          </Link>
        </div>
        <div className={`text-right ${!mobile && "ml-auto"}`}>
          {!mobile &&
            currentUser &&
            !is_owner &&
            (following_id ? (
              <Button className={btnStyles.Button} onClick={() => handleUnfollow(profile)}>
                unfollow
              </Button>
            ) : (
              <Button className={btnStyles.Button} onClick={() => handleFollow(profile)}>
                follow
              </Button>
            ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
