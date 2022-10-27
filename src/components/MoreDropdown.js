import React from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom/";
import styles from "../styles/MoreDropdown.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className=" fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({handleEdit, handleDelete}) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu className="text-center">
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete">
            <i className="fas fa-trash-alt" />
          </Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ProfileEditDropdown = ({id}) => {
  const history = useHistory();

  return(
    <Dropdown className={styles.Absolute}>
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => history.push(`/profiles/${id}/edit`)}
        aria-label="edit-profile">
    <i className="fas fa-edit" />edit profile
        </Dropdown.Item>
        <Dropdown.Item onClick={() => history.push(`/profiles/${id}/edit/username`)}
        aria-label="edit-username">
          <i className="" /> change username
        </Dropdown.Item>
        <Dropdown.Item onClick={() => history.push(`/profiles/${id}/edit/password`)}
        aria-label="edit-password">
          <i className="" /> change password
        </Dropdown.Item>
      </Dropdown.Menu>

    </Dropdown>
  )
}