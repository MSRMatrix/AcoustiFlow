import { useContext } from "react";
import CurrentList from "../MusicContext/CurrentList";
import Title from "../MusicContext/Title";

const PlayingSong = ({src}) => {
const { currentList } = useContext(CurrentList);
const { title, setTitle } = useContext(Title);

    return(
    <div>
     {currentList[0]?.playlist ? (
            <h2>{currentList[0]?.playlist}</h2>
          ) : (
            ""
          )} 

             {!title ? "" : title?.length > 60 ? <p>`${title.slice(0, 60)}...`</p> : <p>{title}</p>}
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
         
    </div>)
}


export default PlayingSong;