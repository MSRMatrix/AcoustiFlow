import { useEffect, useState } from "react";
import TextForIcon from "../../functions/TextForIcon";
import IconButton from "../../functions/IconButton";

const Muted = ({ muted, setMuted, volume: initialVolume }) => {
  const [localVolume, setLocalVolume] = useState(initialVolume);
  const mutedFunction = () => {
    setMuted((prevMode) => !prevMode);
  };

  return (
      <div>
       <IconButton 
       icon={!muted && localVolume !== 0 ? ("fa-solid fa-volume-high") : ("fa-solid fa-volume-xmark")}
       onClick={mutedFunction}
       text={!muted ? "Mute" : "Unmute"}
       />
      </div>
  );
};

export default Muted;
    
    // <div className="text-container">
    //     <TextForIcon showText={showText} text={!muted ? "Mute" : "Unmute"} />
    //     <button
    //       onMouseEnter={() => SetShowText("show-text")}
    //       onMouseLeave={() => SetShowText("")}
    //       className="button-style"
    //       onClick={mutedFunction}
    //     >
    //       {!muted && localVolume !== 0 ? (
    //         <i className="fa-solid fa-volume-high"></i>
    //       ) : (
    //         <i className="fa-solid fa-volume-xmark"></i>
    //       )}
    //     </button>
    //   </div>