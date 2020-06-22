import React, { useState, useEffect } from 'react';

import Stories from '../../containers/Stories';
import Loading from '../../components/Loading';

import Posts from '../../containers/Posts';

import './FeedRoute.scss';

const FeedRoute = () => {
  const [users, setUsers] = useState([]);
  const [stories, setStories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalusers, setTotalUsers] = useState(0);

  const getUserPostById = (postUserId) => users.find(user => postUserId === user.id);

  useEffect(() => {
    fetch('https://5e7d0266a917d70016684219.mockapi.io/api/v1/users')
      .then((res) => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    fetch('https://5e7d0266a917d70016684219.mockapi.io/api/v1/stories')
      .then((res) => res.json())
      .then(data => {
        setStories(data);
      });
  }, [users]);

  useEffect(() => {
    if (totalusers === users.length) {
      return;
    }

    fetch(`https://5e7d0266a917d70016684219.mockapi.io/api/v1/users/${users[totalusers].id}/posts`)
      .then((res) => res.json())
      .then(data => {
        setPosts([...posts, ...data]);
        setTotalUsers(totalusers + 1);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, totalusers]);

  return (
    <div data-testid="feed-route">
      {
        users.length > 0 && stories.length > 0 && ( <Stories stories={stories} getUserHandler={getUserPostById} /> )
      }
      {
        posts.length > 0 
          ?  <Posts posts={posts} getUserHandler={getUserPostById} />
          : <Loading />
      }
    </div>
  );
};

export default FeedRoute;
