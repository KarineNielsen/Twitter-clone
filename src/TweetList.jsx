import React from "react";
import Tweet from "./Tweet";

const TweetList = ({ tweets, onReply, onSubmitReply, onLike, onRetweet }) => {
  return (
    <div className="tweet-list">
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          onReply={onReply}
          onSubmitReply={onSubmitReply}
          onLike={onLike}
          onRetweet={onRetweet}
        />
      ))}
    </div>
  );
};

export default TweetList;
