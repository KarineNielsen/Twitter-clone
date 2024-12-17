import React from "react";
import { LikeIcon, RetweetIcon, ReplyIcon } from "./icons";

const TweetInteractions = ({ tweetId, onLike, onRetweet, onReply }) => {
  return (
    <div className="tweet-interactions">
      <button onClick={() => onReply(tweetId)}>
        <ReplyIcon /> Reply
      </button>
      <button onClick={() => onRetweet(tweetId)}>
        <RetweetIcon /> Retweet
      </button>
      <button onClick={() => onLike(tweetId)}>
        <LikeIcon /> Like
      </button>
    </div>
  );
};

export default TweetInteractions;
