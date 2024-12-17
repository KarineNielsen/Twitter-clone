import React, { useContext } from 'react';
import { AppContext } from "./AppContext";
import "./App.css";

const Header = () => {
  const { theme, setTheme } = useContext(AppContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header>
      <h1 class="clone">Twitter Clone</h1>
      <button class="mode" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
};

export default Header;