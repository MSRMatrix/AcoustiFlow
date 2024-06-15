import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./musicPlayer.css";
import Settings from "./settings/Settings";
import { NavLink, Outlet } from "react-router-dom";
import CurrentSongIndex from "./MusicContext/CurrentSongIndex";
import CurrentList from "./MusicContext/CurrentList";
import { handleDuration, handleProgress } from "./functions/Time";

const MusicPlayer = () => {
  const [playing, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [cooldown, setCooldown] = useState(true)
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState({seconds:"00",
    minutes:"00"});
  const [fullTime, setFullTime] = useState(); 
  const [src, setSrc] = useState({
    name: "",
    band: "",
    src: []
  });
  const {currentSongIndex, setCurrentSongIndex} = useContext(CurrentSongIndex);
  const { currentList, setCurrentList } = useContext(CurrentList);

  if(localStorage.length < 1){
    localStorage.setItem("default-list", "")
  }

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % (src.src.length || 1));
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? (src.src.length || 1) - 1 : prevIndex - 1
    );
  };

  const getCurrentUrl = () => {
    if (!src.src || src.src.length === 0) {
      return "";
    }
    if (Array.isArray(src.src)) {
      return src.src[currentSongIndex] || "";
    }
    return src.src;
  };

  const getCurrentName = () => {
    if (!src.name || src.name.length === 0) {
      return "";
    }
    if (Array.isArray(src.name)) {
      return src.name[currentSongIndex] || "";
    }
    return src.name;
};

const slowerRate = () => {
  if (playbackRate <= 0.2) {
    console.log(`Can't get lower!`);
    return;
  }
  const newRate = (playbackRate - 0.2).toFixed(1);
  setPlaybackRate(parseFloat(newRate));
};

const fasterRate = () => {
  if (playbackRate >= 2) {
    console.log(`Can't get higher!`);
    return;
  }
  const newRate = (playbackRate + 0.2).toFixed(1);
  setPlaybackRate(parseFloat(newRate));
};

  return (
    <>
      <div className="player-container">
        <button onClick={handlePreviousSong}><i className="fa-solid fa-backward-step"></i></button>
        <button disabled={playbackRate <= 0.2 ? true : false} onClick={slowerRate}><i className="fa-solid fa-backward"></i></button>
        <div className="test">
          {currentList[0]?.playlist ? <h3>{currentList[0]?.playlist}</h3> : <h3>No Playlist</h3>} 
          <ReactPlayer
          url={getCurrentUrl()}
          controls
          width={"100px"}
          height={"100px"}
          playing={playing}
          volume={volume}
          loop={loop}
          muted={muted}
          playbackRate={playbackRate}
          onEnded={handleNextSong}
          onDuration={handleDuration(setDuration)}
          onProgress={handleProgress(setTime)}
          progressInterval={500}
          onPlay={() => console.log(`Startet`)
          }
          onPause={() => console.log(`Paused`)
          }
        />
        <p>{getCurrentName()}</p>
        </div>
        <button disabled={playbackRate >= 2 ? true : false} onClick={fasterRate}><i className="fa-solid fa-forward"></i></button>
        <button onClick={handleNextSong}><i className="fa-solid fa-forward-step"></i></button>
        
      </div>
      <Settings
        playing={playing}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
        loop={loop}
        setLoop={setLoop}
        muted={muted}
        setMuted={setMuted}
        src={src}
        setSrc={setSrc}
        time={time}
        duration={duration}
      />
      <NavLink to="/import-export">Daten exportieren oder importieren</NavLink>
      <Outlet />
    </>
  );
};

export default MusicPlayer;
