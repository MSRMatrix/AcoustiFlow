import React, { useEffect, useState } from "react";
import "./loop.css";
import IconButton from "../../functions/IconButton";

const Loop = ({ loop, setLoop, src }) => {
  const loopFunction = () => {
    setLoop((prevMode) => !prevMode);
  };

  useEffect(() => {
    if(src.name && src.name.length <= 1){
      setLoop(true)
    }else{
      setLoop(false)
    }
  },[src])

  return (
    <>
    <IconButton
        icon={loop ? "fa-solid fa-ban" : "fa-solid fa-repeat"}
        onClick={loopFunction}
        disabled={src.src && src.src.length <= 1 ? true : false}
        text={!loop ? "Loop" : "Stop Loop"}
      />
    </>
  );
};

export default Loop;
