import React, { useState } from "react";

const TweetInput = ({ onAddTweet }) => {
  const [tweetContent, setTweetContent] = useState("");

  const handleTweetChange = (e) => {
    setTweetContent(e.target.value);
  };

  const handleTweetSubmit = (e) => {
    e.preventDefault();
    if (tweetContent.trim()) {
      onAddTweet(tweetContent);
      setTweetContent("");
    }
  };

  return (
    <div className="tweet-input">
      <textarea
        value={tweetContent}
        onChange={handleTweetChange}
        placeholder="What's happening?"
      />
      <button onClick={handleTweetSubmit}>Tweet</button>
    </div>
  );
};

export default TweetInput;
