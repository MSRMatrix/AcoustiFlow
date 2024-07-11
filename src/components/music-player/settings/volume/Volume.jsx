import React, { useState, useEffect } from "react";
import "./volume.css";

const Volume = ({ volume: initialVolume, setVolume, muted, setMuted }) => {
  const [localVolume, setLocalVolume] = useState(initialVolume);
  const [savedVolume, setSavedVolume] = useState(null);
  const [volumeDisable, setVolumeDisable] = useState(false);

  useEffect(() => {
    if (muted) {
      setSavedVolume(localVolume);
      setLocalVolume(0);
      setVolumeDisable(true)
    } else if (savedVolume!== null) {
      setLocalVolume(savedVolume);
      setSavedVolume(null);
      setVolumeDisable(false)
    }
  }, [muted]);

  const handleVolumeChange = (e) => {
    if(muted){
    setMuted(false)
    return setSavedVolume(0)
    }
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    setVolume(newVolume);
  };

  return (
    <div className="volume-container">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={localVolume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
      <p>Volume: {!muted? (localVolume * 100).toFixed(0) : 0}%</p>
    </div>
  );
};

export default Volume;