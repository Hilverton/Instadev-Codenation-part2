import React, { useState } from "react";

import Story from '../../components/Story';

import './Stories.scss';

const Stories = ({ stories, getUserHandler }) => {
  const [showStory, setShowStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState({});
  const [selectedUser, setSelectedUser] = useState({});

  function handleStory(story) {
    const profile = getUserHandler(story.userId);
    setSelectedUser(profile);
    setSelectedStory(story);
    setShowStory(!showStory);
  }

  return (
    <React.Fragment>
      <section className="stories" data-testid="stories">
        <div className="container">
          {
            stories.map(story => {
              const profile = getUserHandler(story.userId);
              return (
                <button key={story.id} onClick={() => handleStory(story)} className="user__thumb user__thumb--hasNew">
                  <div className="user__thumb__wrapper">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                    />
                  </div>
                </button>
              ) 
            })
          }
        </div>
      </section>

      {showStory && (
        <Story story={selectedStory} user={selectedUser} handleClose={() => setShowStory(!showStory)} />
        )}
    </React.Fragment>
  );
};

export default Stories;
