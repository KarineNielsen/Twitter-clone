import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TweetInput from "./TweetInput";
import Sidebar from "./Sidebar";
import LeftPane from "./LeftPane";
import Header from "./Header";
import Profile from "./Profile";
import TweetList from "./TweetList";
import "./App.css";
import { AppContext } from "./AppContext";

const App = () => {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({
    name: "Karine",
    username: "karineine",
    profilePicture: "https://scontent.fsvg1-1.fna.fbcdn.net/v/t1.6435-9/95945715_1532025890304581_1991783610276904960_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EwRL98vpvrwQ7kNvgFHX4s_&_nc_zt=23&_nc_ht=scontent.fsvg1-1.fna&_nc_gid=AXOkcigONJ6SYZzwBo0R7Vf&oh=00_AYA0czil-KcjaMLbSclTYvcISX7xHtKcqwqQ7q9iozBxWQ&oe=677E51D3",
  });

  const [theme, setTheme] = useState("light");
  const [currentReplyTweetId, setCurrentReplyTweetId] = useState(null);
  const [currentReplyToReplyId, setCurrentReplyToReplyId] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const addTweet = (content) => {
    const newTweet = {
      id: Date.now(),
      content: content,
      author: user.name,
      username: user.username,
      profilePicture: user.profilePicture,
      date: new Date(),
      likes: 0,
      retweets: 0,
      replies: [],
      hasLiked: false,
      hasRetweeted: false,
    };
    setTweets((prevTweets) => [...prevTweets, newTweet]);
  };

  const handleLike = (tweetId, replyId = null) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              replies: tweet.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      likes: reply.hasLiked ? reply.likes - 1 : reply.likes + 1,
                      hasLiked: !reply.hasLiked,
                    }
                  : reply
              ),
              likes: replyId
                ? tweet.likes
                : tweet.hasLiked
                ? tweet.likes - 1
                : tweet.likes + 1,
              hasLiked: replyId ? tweet.hasLiked : !tweet.hasLiked,
            }
          : tweet
      )
    );
  };

  const handleRetweet = (tweetId, replyId = null) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              replies: tweet.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      retweets: reply.hasRetweeted
                        ? reply.retweets - 1
                        : reply.retweets + 1,
                      hasRetweeted: !reply.hasRetweeted,
                    }
                  : reply
              ),
              retweets: replyId
                ? tweet.retweets
                : tweet.hasRetweeted
                ? tweet.retweets - 1
                : tweet.retweets + 1,
              hasRetweeted: replyId ? tweet.hasRetweeted : !tweet.hasRetweeted,
            }
          : tweet
      )
    );
  };

  const handleReply = (tweetId, replyId = null) => {
    setCurrentReplyTweetId(tweetId);
    setCurrentReplyToReplyId(replyId);
  };

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      const newReply = {
        content: replyContent,
        author: user.name,
        profilePicture: user.profilePicture,
        date: new Date(),
        likes: 0,
        retweets: 0,
        id: Date.now(),
      };

      setTweets((prevTweets) =>
        prevTweets.map((tweet) => {
          if (tweet.id === currentReplyTweetId) {
            if (currentReplyToReplyId) {
              return {
                ...tweet,
                replies: tweet.replies.map((reply) =>
                  reply.id === currentReplyToReplyId
                    ? {
                        ...reply,
                        replies: [...reply.replies, newReply],
                      }
                    : reply
                ),
              };
            } else {
              return {
                ...tweet,
                replies: [...tweet.replies, newReply],
              };
            }
          }
          return tweet;
        })
      );
      setReplyContent("");
      setCurrentReplyTweetId(null);
      setCurrentReplyToReplyId(null);
    }
  };

  return (
    <AppContext.Provider value={{ user, theme, setTheme }}>
      <Router>
        <div className={`app ${theme}`}>
          <Sidebar />
          <main>
            <Header />
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/"
                element={
                  <>
                    <div className="home-profile-info">
                      <img
                        className="profile-pic"
                        src={user.profilePicture}
                        alt={user.name}
                      />
                      <h2>{user.name}</h2>
                    </div>

                    <TweetInput
                      onAddTweet={addTweet}
                      user={user}
                      currentReplyTweetId={currentReplyTweetId}
                      currentReplyToReplyId={currentReplyToReplyId}
                      onReply={handleReplySubmit}
                    />
                    <TweetList
                      tweets={tweets}
                      onLike={handleLike}
                      onRetweet={handleRetweet}
                      onReply={handleReply}
                    />
                  </>
                }
              />
            </Routes>
          </main>
          <LeftPane tweets={tweets} />
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
