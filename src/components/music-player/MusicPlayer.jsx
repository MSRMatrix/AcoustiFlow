import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./musicPlayer.css";
import Settings from "./settings/Settings";

const MusicPlayer = () => {
  const [playing, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);
  const [plackbackRate, setPlaybackRate] = useState(1);
  const [src, setSrc] = useState([])
  return (
    <>
      <div className="player-container">
        <ReactPlayer
          url={src.src}
          controls
          playing={playing}
          volume={volume}
          loop={loop}
          muted={muted}
          playbackRate={plackbackRate}
        />
        <p>{src.name}</p>
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

        plackbackRate={plackbackRate}
        setPlaybackRate={setPlaybackRate}

        src={src}
        setSrc={setSrc}
      />
    </>
  );
};

export default MusicPlayer;
