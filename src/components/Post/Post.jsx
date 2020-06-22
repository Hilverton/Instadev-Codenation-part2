import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Post.scss';

const Post = ({ postInfo, userInfo }) => {
  const [like, setLike] = useState(false);
  const [follow, setFollow] = useState(false);

  const { comments, imageUrl } = postInfo;

  return (
    <article className="post" data-testid="post">
      { userInfo &&
          <header className="post__header">
            <div className="user">
              <Link to={`/users/${userInfo.username}`}>
                <img className="user__thumb" src={userInfo.avatar} alt="Bruce Wayne" />
              </Link>
              <Link to={`/users/${userInfo.username}`} className="user__name">{userInfo.name}</Link>
            </div>
            <button className="post__context" onClick={() => setFollow(!follow)}>
              <span className={`follow-btn ${follow ? 'is-following': ''}`}>{follow ? 'Seguindo' : 'Seguir'}</span>
            </button>
          </header>
      }
      <figure className="post__figure">
        <img src={imageUrl} alt=""/>
      </figure>
      {
        userInfo && 
          <nav className="post__controls">
            <button className="post__control" onClick={() => setLike(!like)}>
              <i className={`${like ? 'fas' : 'far'} fa-heart`}></i>
            </button>
            <div className="post__status">
              <div className="user">
                <span>Curtido por <Link to="/">{comments[0]?.name}</Link> e outra{((comments.length - 1) + like) > 1 && 's'} <Link to="/">{(comments.length - 1) + like} pessoa{((comments.length - 1) + like) > 1 && 's'}</Link></span>
              </div>
            </div>
          </nav>
      }
    </article>
  );
};

export default Post;
