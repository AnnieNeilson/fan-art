import React from 'react'
import appStyles from "../../App.module.css"

import { Container } from 'react-bootstrap'
import Post from './Post'

const PopularPosts = () => {
 
    // const { popularPosts } = useProfileData();
  
    
    return (
      <Container className={appStyles.Content}>
        {/* {popularPosts.results.length ? ( */}
          {/* <> */}
            <h2>Popular Posts</h2>
            
        {/* {popularProfiles.results.slice(0, 5).map((profile) => (
        <Post key={post.id} post={post} />)}

          </>
        ) : (
          <Asset spinner />
        )} */}
        </Container>
    );
  };
  

  
export default PopularPosts