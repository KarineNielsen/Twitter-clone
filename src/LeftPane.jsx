import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import './LeftPane.css';

const LeftPane = ({ tweets }) => {
  const { theme } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [usersToFollow, setUsersToFollow] = useState([]);

  // Fetching random users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();
        setUsersToFollow(data.results);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };
    fetchUsers();
  }, []);

  // Search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = usersToFollow.filter(user =>
    (user.name.first + ' ' + user.name.last).toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.login.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTweets = tweets.filter(tweet =>
    tweet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tweet.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`left-pane ${theme}`}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for users or tweets"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="who-to-follow">
        <h2>Who to Follow?</h2>
        {filteredUsers.length > 0 ? (
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.login.uuid} className="user-item">
                <img src={user.picture.large} alt={user.name.first} className="user-avatar" />
                <div>
                  <p className="user-name">{user.name.first} {user.name.last}</p>
                  <p className="user-username">@{user.login.username}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found</p>
        )}
      </div>

      {searchQuery && (
        <div className="tweets-section">
          <h2>Tweets</h2>
          {filteredTweets.length === 0 ? 
            <p>No tweets found</p>
           : (
            <ul>
              {filteredTweets.map((tweet) => (
                <li key={tweet.id} className="tweet-item">
                  <p className="tweet-content">{tweet.content}</p>
                  <p className="search-username">@{tweet.username}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LeftPane;
