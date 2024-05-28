import React, { useContext, useState } from "react";
import ReactPlayer from "react-player";
import "./musicPlayer.css";
import Settings from "./settings/Settings";
import MusicContext from "./MusicContext/MusicContext";
import { NavLink } from "react-router-dom";

const MusicPlayer = () => {
  const { musicContext, setMusicContext } = useContext(MusicContext);
  const [playing, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [src, setSrc] = useState({
    name: "",
    band: "",
    src: []
  });
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % src.src.length);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? src.src.length - 1 : prevIndex - 1
    );
  };

  const getCurrentUrl = () => {
    if (src.src === undefined || src.src.length === 0) {
      return "";
    }
    if (Array.isArray(src.src[0])) {
      return src.src[currentSongIndex][0];
    }
    return src.src;
  };

  return (
    <>
      <div className="player-container">
          <ReactPlayer
            url={getCurrentUrl()}
            controls
            playing={playing}
            volume={volume}
            loop={loop}
            muted={muted}
            playbackRate={playbackRate}
            onEnded={handleNextSong}
            progressInterval={1000} 
          />
        <p>{src.band} ~ {src.name}</p>
        <button onClick={handleNextSong}>Weiter</button>
          <button onClick={handlePreviousSong}>Zurück</button>
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
        playbackRate={playbackRate}
        setPlaybackRate={setPlaybackRate}
        src={src}
        setSrc={setSrc}
      />
      <NavLink to="/import-export">Daten exportieren oder importieren</NavLink>
    </>
  );
};

export default MusicPlayer;
