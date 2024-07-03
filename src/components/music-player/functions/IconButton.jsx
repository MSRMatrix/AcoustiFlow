import { useState } from "react";
import TextForIcon from "./TextForIcon";

const IconButton = ({ icon, onClick, disabled, text }) => {
  const [showText, setShowText] = useState("");

  return (
    <div style={{ position: "relative" }}>
      <TextForIcon showText={showText} text={text} />
      <button
        onMouseEnter={() => setShowText("show-text")}
        onMouseLeave={() => setShowText("")}
        className="button-style"
        onClick={onClick}
        disabled={disabled}
      >
        <i className={icon}></i>
      </button>
    </div>
  );
};

export default IconButton;
