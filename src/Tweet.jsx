import React, { useState } from "react";
import { LikeIcon, RetweetIcon, ReplyIcon } from "./icons";

const Tweet = ({ tweet, onReply, onSubmitReply, onLike, onRetweet }) => {
  const [replyContent, setReplyContent] = useState("");

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = () => {
    onSubmitReply(tweet.id, replyContent);
    setReplyContent("");
  };

  return (
    <div className="tweet">
      <div className="tweet-info">
        <img className="profile-pic" src={tweet.profilePicture} alt={tweet.author} />
          <p className="tweet-author">@{tweet.username}</p>
            <div className="content">{tweet.content}</div>
        
      </div>

      <div className="tweet-interactions">
        <button onClick={() => onReply(tweet.id)}>
          <ReplyIcon />
        </button>
        <button onClick={() => onLike(tweet.id)}>
          <LikeIcon />
          {tweet.hasLiked ? "1" : "0"}
        </button>
        <button onClick={() => onRetweet(tweet.id)}>
          <RetweetIcon />
          {tweet.hasRetweeted ? "1" : "0"}
        </button>
      </div>

      {tweet.replyingTo && (
        <div className="reply-input">
          <textarea
            value={replyContent}
            onChange={handleReplyChange}
            placeholder="Write your reply..."
          />
          <button onClick={handleReplySubmit}>Reply</button>
        </div>
      )}

      {tweet.replies.length > 0 && (
        <div className="replies">
          {tweet.replies.map((reply) => (
            <Tweet
              key={reply.id}
              tweet={reply}
              onLike={onLike}
              onRetweet={onRetweet}
              onReply={onReply}
              onSubmitReply={onSubmitReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;
