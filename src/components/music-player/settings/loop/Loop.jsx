import React, { useEffect, useState } from "react";
import "./loop.css";
import IconButton from "../../functions/IconButton";

const Loop = ({ loop, setLoop, src }) => {
  const loopFunction = () => {
    setLoop((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (
      (src.name && src.playlist && src.name.length <= 1) ||
      Object.entries(src).length <= 2
    ) {
      setLoop(true);
    } else {
      setLoop(false);
    }
  }, [src]);

  return (
    <div className="text-container" onClick={loopFunction}>
      <IconButton
        icon={loop ? "fa-solid fa-ban" : "fa-solid fa-repeat"}
        
        disabled={
          (src.src && src.playlist && src.src.length <= 2) ||
          Object.entries(src).length <= 2
            ? true
            : false
        }
        text={!loop ? "Loop" : "Stop Loop"}
      />
    </div>
  );
};

export default Loop;
