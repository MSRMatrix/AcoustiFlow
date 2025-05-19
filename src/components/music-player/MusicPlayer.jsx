import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import "./musicPlayer.css";
import Settings from "./settings/Settings";
import { Outlet } from "react-router-dom";
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
import Playing from "./settings/playing/Playing";
import StopList from "./settings/stopList/StopList";
import Loop from "./settings/loop/Loop";
import Muted from "./settings/muted/Muted";
import Volume from "./settings/volume/Volume";
import DisplayTable from "./MusicContext/DisplayTable";
import Title from "./MusicContext/Title";
import VolumeContext from "./MusicContext/VolumeContext";
import MusicPlayerWindow from "./musicPlayerWindow/MusicPlayerWindow";

const MusicPlayer = () => {
  const playerRef = useRef(null);
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
  const [cooldown, setCoolDown] = useState(true);
  const [oldIndex, setOldIndex] = useState(null);
  const { displayTable } = useContext(DisplayTable);
  const { title, setTitle } = useContext(Title);
  const { volumeContext, setVolumeContext } = useContext(VolumeContext);

  function readyFunction(player) {
    const newSong = player.getInternalPlayer().videoTitle;
    setTitle(newSong);
    return;
  }

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
    setCoolDown(true);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? (src.src.length || 1) - 1 : prevIndex - 1
    );
    setCoolDown(true);
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

  if (cooldown && src.src && src.src.length > 1) {
    setTimeout(() => {
      setCoolDown(false);
    }, 1000);
  }

  if (!cooldown && src.src && src.src.length <= 1) {
    setCoolDown(true);
  }

  useEffect(() => {
    if (!volumeContext) {
      setVolumeContext(0.2);
    }
  }, []);
  
  useEffect(() => {
    const srcLength = src.src && src.src.length;
    let currentName;
    if (Array.isArray(getCurrentName())) {
      currentName = currentList[0]?.songs
        .map((item) => item.name)
        .filter((songName) => songName === getCurrentName()[0]);
    }
    if (typeof getCurrentName() === "string") {
      currentName = currentList[0]?.songs
        .map((item) => item.name)
        .filter((songName) => songName === getCurrentName());
    }

    const currentSong =
      currentList[0]?.songs
        .map((item) => item.src)
        .findIndex((index) => index === getCurrentUrl()) + 1;
    if ((isNaN(currentSong) && srcLength <= 0) || srcLength === undefined) {
      return;
    }
    return setOldIndex(`${currentSong}/${srcLength}`);
  }, [title, getCurrentUrl(), getCurrentName(), displayTable]);

  return (
    <>
      <div className="main-div">
        <div className="player-container">
          <div className="test">
            <div className="player">
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
                ref={playerRef}
                progressInterval={500}
                onReady={readyFunction}
              />
            </div>

            <div className="title-from-current-music">
              <div className="black-screen-part">
                <h3>AcoustiFlow</h3>
              </div>

              <div className="screen-information">
                {/* {currentList[0]?.playlist ? (
            <h2>{currentList[0]?.playlist}</h2>
          ) : (
            ""
          )} */}

                {/* {!title ? "" : title?.length > 60 ? <p>`${title.slice(0, 60)}...`</p> : <p>{title}</p>}
          {src && src.playlist ?  <p>{oldIndex}</p> : ""}
        <p>{playbackRate === 1 ? "Standart" : `${playbackRate}x`} Speed</p>
        <p>Volume: {!muted? (volumeContext * 100).toFixed(0) : 0}%</p>

         

        <ProgressBar
          src={src}
          time={time}
          setTime={setTime}
          duration={duration}
          playerRef={playerRef}
        /> 
         */}
                <MusicPlayerWindow src={src} setSrc={setSrc}/>
               
              </div>

              <Volume
                muted={muted}
                setMuted={setMuted}
                volume={volume}
                setVolume={setVolume}
              />
              <div className="black-screen-part"></div>
            </div>
          </div>

          <div className="muted-volume">
            <Muted muted={muted} setMuted={setMuted} volume={volume} />
          </div>

          <div className="stop-loop">
            <StopList src={src} setSrc={setSrc} />
            <Loop loop={loop} setLoop={setLoop} src={src} />
          </div>

          <div className="settings-box">
            <IconButton
              icon="fa-solid fa-backward-step"
              onClick={handlePreviousSong}
              text="Previous"
              disabled={cooldown || Object.entries(src).length <= 2}
            />
            <IconButton
              icon="fa-solid fa-backward"
              onClick={slowerRate}
              disabled={playbackRate <= 0.2}
              text="Slower"
            />
            <Playing
              playing={playing}
              setIsPlaying={setIsPlaying}
              src={src}
              setSrc={setSrc}
            />

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
              disabled={cooldown || Object.entries(src).length <= 2}
            />
          </div>
        </div>
      </div>

      {/* <Settings src={src} setSrc={setSrc} /> */}
    </>
  );
};

export default MusicPlayer;

// {src && src.playlist ? `${oldName
//   ? oldName.length > 60
//     ? `${oldName.slice(0, 60)}...`
//     : oldName
//   : ""}` : getCurrentName() }
