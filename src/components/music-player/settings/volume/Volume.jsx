import { useState } from "react";
import "./volume.css";

const Volume = ({ volume, setVolume }) => {
  const [emptyBar, setEmptyBar] = useState(50);
  const [fullBar, setFullBar] = useState(50); 
  
  const increaseVolume = () => {
    if (volume >= 0.1) {
      alert("Music-Player kann nicht lauter gedreht werden!");
    } else {
      setEmptyBar(emptyBar - 10);
      setFullBar(fullBar + 10);
      const newVolume = Number((volume + 0.01).toFixed(2));
      setVolume(newVolume);
    }
  };
  const decreaseVolume = () => {
    if (volume <= 0.01) {
      alert("Music-Player kann nicht leiser gedreht werden!");
    } else {
      setFullBar(fullBar - 10);
      setEmptyBar(emptyBar + 10);
      const newVolume = Number((volume - 0.01).toFixed(2));
      setVolume(newVolume);
    }
  };

  return (
    <>
    <button disabled={volume <= 0.01 ? true : false} onClick={decreaseVolume}>leiser</button>
      <button disabled={volume >= 0.1 ? true : false} onClick={increaseVolume}>lauter</button>
      <p>
        Lautstärke: {(volume * 100).toFixed(2)}{" "}
        <span
          className="volume-bar"
          style={{
            background: `linear-gradient(to right, #7bfeb2 ${fullBar}%, white ${emptyBar}%)`,
          }}
        ></span>
      </p>
    </>
  );
};

export default Volume;
