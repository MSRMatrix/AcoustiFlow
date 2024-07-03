import React, { useState } from "react";
import "./loop.css";
import TextForIcon from "../../functions/TextForIcon";

const Loop = ({ loop, setLoop }) => {
    const [showText, SetShowText] = useState()
  const loopFunction = () => {
    setLoop((prevMode) => !prevMode);
  };

  return (
    <>
    <div className="text-container">
      <TextForIcon showText={showText} text={!loop ? "Loop" : "Stop Loop"} />
      <button onMouseEnter={() => SetShowText("show-text")} onMouseLeave={() => SetShowText("")}  className="button-style" onClick={loopFunction}>
        {loop ? (
          <i className="fa-solid fa-ban"></i>
        ) : (
          <i className="fa-solid fa-repeat"></i>
        )}
      </button>
      </div>
    </>
  );
};

export default Loop;
