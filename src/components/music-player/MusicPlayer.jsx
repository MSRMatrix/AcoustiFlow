import React, { useContext, useState } from "react";
import ReactPlayer from "react-player";
import "./musicPlayer.css";
import Settings from "./settings/Settings";
import { NavLink, Outlet } from "react-router-dom";
import CurrentSongIndex from "./MusicContext/CurrentSongIndex";
import CurrentList from "./MusicContext/CurrentList";
import { handleDuration, handleProgress } from "./functions/Time";
import IconButton from "./functions/IconButton";

const MusicPlayer = () => {
  const [playing, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState({ hours: "00", seconds: "00", minutes: "00" });
  const [src, setSrc] = useState({ name: "", band: "", src: [] });
  const { currentSongIndex, setCurrentSongIndex } = useContext(CurrentSongIndex);
  const { currentList } = useContext(CurrentList);

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % (src.src.length || 1));
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex === 0 ? (src.src.length || 1) - 1 : prevIndex - 1));
  };

  const getCurrentUrl = () => {
    if (!src.src || src.src.length === 0) return "";
    return Array.isArray(src.src) ? src.src[currentSongIndex] || "" : src.src;
  };

  const getCurrentName = () => {
    if (!src.name || src.name.length === 0) return "";
    return Array.isArray(src.name) ? src.name[currentSongIndex] || "" : src.name;
  };

  const slowerRate = () => {
    if (playbackRate <= 0.2) return;
    setPlaybackRate((prevRate) => parseFloat((prevRate - 0.2).toFixed(1)));
  };

  const fasterRate = () => {
    if (playbackRate >= 2) return;
    setPlaybackRate((prevRate) => parseFloat((prevRate + 0.2).toFixed(1)));
  };

  return (
    <>
      <div className="player-container">
        <IconButton
          icon="fa-solid fa-backward-step"
          onClick={handlePreviousSong}
          text="Previous"
        />
        <IconButton
          icon="fa-solid fa-backward"
          onClick={slowerRate}
          disabled={playbackRate <= 0.2}
          text="Slower"
        />
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
          />
          <p>{getCurrentName()}</p>
        </div>
        <IconButton
          icon="fa-solid fa-forward"
          onClick={fasterRate}
          disabled={playbackRate >= 2}
          text="Faster"
        />
        <IconButton
          icon="fa-solid fa-forward-step"
          onClick={handleNextSong}
          text="Next"
        />
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
