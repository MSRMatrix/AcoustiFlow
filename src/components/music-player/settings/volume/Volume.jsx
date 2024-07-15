import { useState, useEffect } from "react";
import "./volume.css";

const Volume = ({ volume: initialVolume, setVolume, muted, setMuted }) => {
  const [localVolume, setLocalVolume] = useState(initialVolume);
  const [savedVolume, setSavedVolume] = useState(null);

  useEffect(() => {
    if (muted) {
      if(localVolume <= 0){
        setSavedVolume(0.1);
      }
      else{
        setSavedVolume(localVolume);
      }
      setLocalVolume(0);
    } else if (savedVolume!== null) {
      setLocalVolume(savedVolume);
      setSavedVolume(null);
    }
  }, [muted]);

  useEffect(() => {
    if(localVolume <= 0){
      setMuted(true)
    }
    if(localVolume === 0 && muted && savedVolume === null || localVolume === 0 && muted && savedVolume <= 0.1){
      setVolume(0.1)
    }
  },[localVolume && !muted, savedVolume && !muted])

  const handleVolumeChange = (e) => {
    if(muted){
    setLocalVolume(savedVolume)
    setVolume(localVolume)
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