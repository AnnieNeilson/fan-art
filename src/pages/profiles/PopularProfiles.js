import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Asset from "../../components/Assets";
import appStyles from "../../App.module.css";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";



const PopularProfiles = ({ mobile }) => {

  const { popularProfiles } = useProfileData();

  
  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularProfiles.results.length ? (
        <>
          <h2>Most Popular Accounts</h2>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.slice(0, 5).map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;