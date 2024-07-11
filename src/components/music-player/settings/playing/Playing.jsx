import { useState } from "react";
import IconButton from "../../functions/IconButton";

const Playing = ({ playing, setIsPlaying, src, setSrc }) => {
  const [cooldown, setCooldown] = useState(false);

  const playFunction = () => {
    if (src.src && !cooldown) {
      setIsPlaying((prevMod) => !prevMod);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 200);
    }
  };

  return (
    <div className="text-container">
      <IconButton
        icon={playing && src.src && src.src.length > 0 ? "fa-solid fa-pause" : "fa-solid fa-play"}
        onClick={playFunction}
        disabled={!src.src || src.src.length === 0 || cooldown}
        text={!playing ? "Play" : "Pause"}
      />
    </div>
  );
};

export default Playing;
