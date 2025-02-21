import { useState, useEffect, useContext } from "react";
import "./volume.css";
import VolumeContext from "../../MusicContext/VolumeContext";

const Volume = ({ volume: initialVolume, setVolume, muted, setMuted }) => {
  const [localVolume, setLocalVolume] = useState(initialVolume);
  const [savedVolume, setSavedVolume] = useState(0);
  const {volumeContext, setVolumeContext} = useContext(VolumeContext)

  useEffect(() => {
    if (muted) {
      if(localVolume <= 0){
        setSavedVolume(0.01);
      }
      else{
        setSavedVolume(localVolume);
      }
      setLocalVolume(0);
    } else if (savedVolume!== 0) {
      setLocalVolume(savedVolume);
      setSavedVolume(0);
    }
  }, [muted]);

  useEffect(() => {
    if(localVolume <= 0){
      setMuted(true)
    }
    if(localVolume === 0 && muted && savedVolume <= 0.01){
      setVolume(0.01)
      setVolumeContext(0.01)
    }
  },[localVolume, savedVolume])

  const handleVolumeChange = (e) => {
    if(muted){
    setLocalVolume(savedVolume)
    setVolume(localVolume)
    setVolumeContext(localVolume)
    setMuted(false)
    return setSavedVolume(0)
    }
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    setVolume(newVolume);
    setVolumeContext(newVolume)
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
    </div>
  );
};

export default Volume;