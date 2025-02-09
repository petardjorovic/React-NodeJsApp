import React from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

function ToggleModeComponent({ darkMode, setDarkMode }) {
  function handleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div onClick={handleDarkMode} className="cursor-pointer">
      {darkMode ? <CiLight size={45} /> : <MdDarkMode size={45} />}
    </div>
  );
}

export default ToggleModeComponent;
