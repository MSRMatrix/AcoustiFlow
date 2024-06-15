import React from "react";
import "./volume.css";

const Volume = ({ volume, setVolume, muted }) => {
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="volume-container">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
      <p>Lautstärke: {!muted ? (volume * 100).toFixed(0) : 0}%</p>
    </div>
  );
};

export default Volume;