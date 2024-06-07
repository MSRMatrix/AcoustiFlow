import React, { useContext, useState } from "react";
import ReactPlayer from "react-player";
import "./musicPlayer.css";
import Settings from "./settings/Settings";
import { NavLink } from "react-router-dom";
import CurrentSongIndex from "./MusicContext/CurrentSongIndex";

const MusicPlayer = () => {
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
  const {currentSongIndex, setCurrentSongIndex} = useContext(CurrentSongIndex);

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
  return (
    <>
      {src.playlist ? <p>The Playlist: {src.playlist}</p> : <></>} 
      <div className="player-container">
        <button onClick={handleNextSong}>Weiter</button>
        <div className="test">
          <ReactPlayer
          url={getCurrentUrl()}
          controls
          playing={playing}
          volume={volume}
          loop={loop}
          muted={muted}
          playbackRate={playbackRate}
          onEnded={handleNextSong}
          width={100}
          height={100}
          progressInterval={1000} 
        />
        </div>
        
        <p>{getCurrentName()}</p>
        
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
