import { useEffect, useState } from "react";
import { handleProgress } from "../../functions/Time";

const ProgressBar = ({ src, time, setTime, duration, playerRef }) => {
  const [newTime, setNewTime] = useState();

  const changeTime = (e) => {
    setNewTime(e);
    playerRef.current.seekTo(e.playedSeconds)
     handleProgress(setTime)(newTime);
  };

  return (
    <>
      {src && src.src && src.src.length > 0 && time && duration ? (
        <div style={{display:"flex", flexDirection:"column"}}>
          <p>
            {time.hours}:{time.minutes}:{time.seconds} / {duration.hours}:
            {duration.minutes}:
            {duration.seconds.length >= 2
              ? duration.seconds
              : `${duration.seconds}`}
          </p><input
  type="range"
  name="range"
  id="range"
  step="any"
  min={null}
  max={
    parseInt(duration.hours, 10) * 3600 +
    parseInt(duration.minutes, 10) * 60 +
    parseInt(duration.seconds, 10)
  || null}
  value={parseInt(time.hours, 10) * 3600 +
    parseInt(time.minutes, 10) * 60 +
    parseInt(time.seconds, 10)}
  onChange={(e) => {
    changeTime({ playedSeconds: Number(e.target.value) });
  }}
/>
        </div>
      ) : (
        <p>No music played</p>
      )}
      
    </>
  );
};

export default ProgressBar;
