import React, { useContext } from 'react';
import './Sidebar.css';
import { AppContext } from "./AppContext";
import { Home, Explore, Notifications, Messages, Bookmarks, Lists, ProfileIcon, More } from './icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { theme } = useContext(AppContext);

  return (
    <div className={`sidebar ${theme}`}>
      <nav>
        <ul>
          <li><Link to="/"><span><Home /><span className="menu">Home</span></span></Link></li>
          <li><span><Explore /><span className="menu">Explore</span></span></li>
          <li><span><Notifications /><span className="menu">Notifications</span></span></li>
          <li><span><Messages /><span className="menu">Messages</span></span></li>
          <li><span><Bookmarks /><span className="menu">Bookmarks</span></span></li>
          <li><span><Lists /><span className="menu">Lists</span></span></li>
          <li>
            <Link to="/Profile">
              <span><ProfileIcon /><span className="menu">Profile</span></span>
            </Link>
          </li>
          <button className="more"><span><More /><span className="menu">More</span></span></button>
        </ul>
      </nav>
      <button className="tweet-btn">Tweet</button>
    </div>
  );
};

export default Sidebar;
