import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import UserProfile from '../../containers/UserProfile';
import UserPosts from '../../containers/UserPosts';

import Loading from '../../components/Loading';

const ProfileRoute = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      try {
        const response = await fetch(`https://5e7d0266a917d70016684219.mockapi.io/api/v1/users?search=${username}`);
        const data = await response.json();
        setUser(data[0]);
      } catch(err) {
        console.log('erro',err);
      } 
    }

    fetchApi();
  }, [username]);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(`https://5e7d0266a917d70016684219.mockapi.io/api/v1/users/${user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.log('erro',err);
      }
    }

    if (user) {
      getPosts();
    }
  }, [user]);

  return (
    <div data-testid="profile-route">
      {
        user 
          ? (
              <>
                <UserProfile avatar={user.avatar} name={user.name} username={user.username} />
                <UserPosts posts={posts} />
              </>
            )
          : <Loading />
      }

    </div>
  );
};

export default ProfileRoute;
