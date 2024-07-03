import { useState } from "react";
import TextForIcon from "./TextForIcon";
import "./iconButton.css"

const IconButton = ({ icon, onClick, disabled, text }) => {
  const [showText, setShowText] = useState("");

  return (
    <div className="icon-button-container">
      <TextForIcon showText={showText} text={text} />
      <button 
        onMouseEnter={() => setShowText("show-text")}
        onMouseLeave={() => setShowText("")}
        className="button-style"
        onClick={onClick}
        disabled={disabled}
      >
        <i style={{color: disabled ? "gray" : ""}} className={icon}></i>
      </button>
    </div>
  );
};

export default IconButton;