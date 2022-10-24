import React, { useState } from "react";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContexts";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const {
    profile_id,
    id,
    profile_image,
    owner,
    updated_at,
    content,
    setPost,
    setComments,
  } = props;
  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost(prevPost => ({
        results: [{
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1
        }]
      }))
      setComments( prevComments => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }))
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Card className={styles.Comment}>
        <Card.Body>
          <Media>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={45} />
            </Link>

            <Media.Body>
              <div className="d-flex align-items-center">
                <span className={styles.Owner}>
                  <Link to={`/profiles/${profile_id}`}>{owner}</Link>
                </span>
                <span className={styles.Date}>{updated_at}</span>
              </div>

              {showEditForm ? (
            <CommentEditForm 
            id={id} profile_id={profile_id} content={content}
            profileImage={profile_image} setComments={setComments}
            setShowEditForm={setShowEditForm} />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
            // </Media.Body>
            // {is_owner && (
            //   <MoreDropdown
            //     // handleEdit={handleEdit}
            //     handleDelete={handleDelete}
            //   />
            )}
          </Media>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
