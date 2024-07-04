import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./musicPlayer.css";
import Settings from "./settings/Settings";
import { NavLink, Outlet } from "react-router-dom";
import CurrentSongIndex from "./MusicContext/CurrentSongIndex";
import CurrentList from "./MusicContext/CurrentList";
import { handleDuration, handleProgress } from "./functions/Time";
import IconButton from "./functions/IconButton";

import firstPic from "/src/assets/first-pic.png";
import secondPic from "/src/assets/second-pic.png";
import thirdPic from "/src/assets/third-pic.png";
import fourthPic from "/src/assets/fourth-pic.png";
import fifthPic from "/src/assets/fifth-pic.png";
import sixthPic from "/src/assets/sixth-pic.png";
import noMusic from "/src/assets/no-music.png";
import Playing from "./settings/playing/Playing";
import StopList from "./settings/stopList/StopList";
import Loop from "./settings/loop/Loop";
import Muted from "./settings/muted/Muted";
import Volume from "./settings/volume/Volume";

const MusicPlayer = () => {
  const [playing, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState({
    hours: "00",
    seconds: "00",
    minutes: "00",
  });
  const [src, setSrc] = useState({ name: "", src: [] });
  const { currentSongIndex, setCurrentSongIndex } =
    useContext(CurrentSongIndex);
  const { currentList } = useContext(CurrentList);
  const pictureArray = [
    firstPic,
    secondPic,
    thirdPic,
    fourthPic,
    fifthPic,
    sixthPic,
  ];
  const [currentPic, setCurrentPic] = useState([pictureArray[0]]);

  useEffect(() => {
    let count = 0;

    const changePicture = () => {
      count = (count + 1) % pictureArray.length;
      setTimeout(() => {
        setCurrentPic(pictureArray[count]);
      }, 500);
    };

    const intervalId = setInterval(changePicture, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (localStorage.length <= 0) {
    localStorage.setItem("default-list", "");
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
    if (!src.src || src.src.length === 0) return "";
    return Array.isArray(src.src) ? src.src[currentSongIndex] || "" : src.src;
  };

  const getCurrentName = () => {
    if (!src.name || src.name.length === 0) return "";
    return Array.isArray(src.name)
      ? src.name[currentSongIndex] || ""
      : src.name;
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
        {currentList[0]?.playlist ? (
          <h3>{currentList[0]?.playlist}</h3>
        ) : (
          <h3>No Playlist</h3>
        )}
        <div className="test">
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

          <div
            className="player"
            style={{
              backgroundImage: `url(${
                src && src.src && src.src.length > 0 ? currentPic : noMusic
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <ReactPlayer
              url={getCurrentUrl()}
              controls
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
        <p>
         
          {getCurrentName()
            ? getCurrentName().length >= 50
              ? `${getCurrentName().slice(0, 50)}...`
              : getCurrentName()
            : "No music choosed"}
        </p> 
        <div className="settings-box">
            <Playing playing={playing} setIsPlaying={setIsPlaying} src={src} setSrc={setSrc}/>
     <StopList src={src} setSrc={setSrc} />
      <Loop loop={loop} setLoop={setLoop} />
      <Muted muted={muted} setMuted={setMuted} />
          </div>

               
      <Volume muted={muted} volume={volume} setVolume={setVolume} />
        
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
