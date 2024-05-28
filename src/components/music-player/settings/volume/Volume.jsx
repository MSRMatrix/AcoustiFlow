import { useState, useRef } from "react";
import "./volume.css";

const Volume = ({ volume, setVolume, muted }) => {
  const [bar, setBar] = useState(20);
  const intervalRef = useRef(null);

  const increaseVolume = () => {
    if (volume >= 1) {
      alert("Music-Player kann nicht lauter gedreht werden!");
    } else {
      intervalRef.current = setInterval(() => {
        setBar(prevBar => {
          const newBar = prevBar + 1;
          return newBar > 100 ? 100 : newBar;
        });

        setVolume(prevVolume => {
          const newVolume = prevVolume + 0.01;
          return newVolume > 1 ? 1 : newVolume;
        });
      }, 50);
    }
  };

  const decreaseVolume = () => {
    if (volume <= 0.01) {
      alert("Music-Player kann nicht leiser gedreht werden!");
    } else {
      intervalRef.current = setInterval(() => {
        setBar(prevBar => {
          const newBar = prevBar - 1;
          return newBar < 0 ? 0 : newBar;
        });

        setVolume(prevVolume => {
          const newVolume = prevVolume - 0.01;
          return newVolume < 0 ? 0 : newVolume;
        });
      }, 50);
    }
  };

  const stopVolumeChange = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <>
      <button 
        disabled={volume <= 0.01} 
        onMouseDown={decreaseVolume} 
        onMouseUp={stopVolumeChange}
        onMouseLeave={stopVolumeChange}
      >
        leiser
      </button>
      <button 
        disabled={volume >= 1} 
        onMouseDown={increaseVolume} 
        onMouseUp={stopVolumeChange}
        onMouseLeave={stopVolumeChange}
      >
        lauter
      </button>
      <p>
        Lautstärke: {!muted ? (volume * 100).toFixed(0) : 0}%
        <span className="volume-bar">
          <span className="green" style={{ width: `${bar}px` }}></span>
        </span>
      </p>
    </>
  );
};

export default Volume;
