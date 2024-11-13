import { useState, useEffect, useContext } from "react";
import Table from "./table/Table";
import { newestList } from "../../functions/NewestList";
import DisplayTable from "../../MusicContext/DisplayTable";
import ShowInput from "../../MusicContext/ShowInput";
import TakeMusic from "../../MusicContext/TakeMusic";
import { PlaylistChanger } from "../dialog/Dialog";
import CurrentList from "../../MusicContext/CurrentList";
import { showCurrentPlaylist } from "../../functions/ShowCurrentPlaylist";
import {handleDeleteMusic, handleSaveMusic} from "../../functions/addAndDeleteMusic"
import {handleNewPlaylist} from "../../functions/handleNewPlaylist"
import "./music.css";

const Music = ({ src, setSrc, loop, setLoop }) => {
  const { displayTable, setDisplayTable } = useContext(DisplayTable);
  const { showInput, setShowInput } = useContext(ShowInput);
  const { takeMusic, setTakeMusic } = useContext(TakeMusic);
  const { currentList, setCurrentList } = useContext(CurrentList);
  const [openDialog, setOpenDialog] = useState({newMusic: false});

  const handleSubmit = (e) => {
    e.preventDefault();
    setSrc([]);
    setCurrentList([]);

    setTimeout(() => {
      const newSrc = {
        src: e.target.elements.src.value,
      };
      setSrc(newSrc);
      titleFixer(newSrc);
      e.target.reset();
      setShowInput(true);
    }, 100);
  };

  const titleFixer = (newSrc) => {
    setTimeout(() => {
      if (!document.querySelector("iframe")?.title.split(",").join("")) {
        setShowInput(false);
        setSrc({
          name: "Unknown",
          src: newSrc.src,
        });
        return;
      }
      const title = document.querySelector("iframe").title.split(",").join("");

      if (title === "YouTube video player") {
        setTimeout(() => {
          const newTitle = document
            .querySelector("iframe")
            .title.split(",")
            .join("");
          const music = {
            name: newTitle,
            src: newSrc.src,
          };
          setSrc(music);
          newestList(setDisplayTable);
          showCurrentPlaylist(setCurrentList);
          return;
        }, 1000);
      } else {
        const newTitle = {
          name: title,
          src: newSrc.src,
        };
        setSrc(newTitle);
      }
      newestList(setDisplayTable);
      showCurrentPlaylist(setCurrentList);
    }, 1000);
  };

  
  useEffect(() => {
    newestList(setDisplayTable, src.playlist);
    showCurrentPlaylist(setCurrentList, src.playlist);
  }, []);
  

  return (
    <div className="music-component-div">
      {" "}
      {openDialog.newMusic && (
        <PlaylistChanger setOpenDialog={setOpenDialog} src={src} setSrc={setSrc} />
      )}
      <form onSubmit={handleSubmit}>
        <input style={{width: "300px"}}
          type="url"
          name="src"
          required
          placeholder="Add new song"
          min={5}
        />
        <button type="submit">Play</button>
      </form>
      {showInput && (
        <div>
          <p>Do you want to save this song?</p>
          <div className="add-new-song">
            <input
            placeholder="Song Name"
              style={{
                boxShadow:
                  src.name && src.name.length > 60
                    ? "0px 0px 10px 10px red"
                    : "",
                transition: "0.5s ease-in-out",width: "300px",
              }}
              type="text"
              value={src.name || ""}
              onChange={(e) => setSrc({ ...src, name: e.target.value })}
            />
            <div>
              <button
                onClick={() => {
                  if (src.name.trim().length > 60) {
                    return alert(`Name should be shorter or equal to 60!`);
                 
                  }  else if(!src.name.trim() || !src.src.trim()){
                    return alert("Should not be empty!")
                  }else{
                    handleSaveMusic(src, setTakeMusic, newestList, setDisplayTable, setShowInput, setSrc), setOpenDialog({newMusic: true});
                  }
                  
                }}
              >
                Yes
              </button>
              <button onClick={() => handleDeleteMusic(setSrc, setShowInput, newestList, setDisplayTable, showCurrentPlaylist, setCurrentList)}>No</button>
            </div>
          </div>

          <div>
            {src.name && src.name.trim().length > 60 ? (
              <p style={{ color: "red" }}>
                Name shoud be shorter or equal to 60!
              </p>
            ) : (
              ""
            )}
            <p>{src.name && src.name.trim().length}</p>
          </div>
        </div>
      )}
      <Table src={src} setSrc={setSrc} />
      <form onSubmit={(e) => handleNewPlaylist(e, setShowInput, currentList, newestList, setDisplayTable, showCurrentPlaylist, setCurrentList)}>
        <input required type="text" placeholder="New Playlist" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Music;


// const [disable, setDisable] = useState({
//   newSong: "",
//   newPlaylist: "",
// })
  
// return (
//   <div className="music-component-div">
//     {" "}
//     {isOpen && (
//       <PlaylistChanger setIsOpen={setIsOpen} src={src} setSrc={setSrc} />
//     )}
//     <form onSubmit={handleSubmit}>
//     <input required
//       type="text"
//       placeholder="New Song"
//       value={disable.newSong}
//       onChange={(e) => setDisable({newSong: e.target.value})} />
//       <button  type="submit" disabled={!disable.newSong} style={{background: disable.newSong ? "" : "gray"}}>Play</button>
//     </form>
//     {showInput && (
//       <div>
//         <p>Do you want to save this song?</p>
//         <div className="add-new-song">
//           <input
//             style={{
//               boxShadow:
//                 src.name && src.name.length > 60
//                   ? "0px 0px 10px 10px red"
//                   : "",
//               transition: "0.5s ease-in-out",
//             }}
//             type="text"
//             value={src.name}
//             onChange={(e) => setSrc({ ...src, name: e.target.value })}
//           />
//           <div>
//             <button
//               onClick={() => {
//                 if (src.name.length > 60) {
//                   return alert(`Name should be shorter or equal to 60!`);
//                 }
//                 handleSaveMusic(), setIsOpen(true);
//               }}
//             >
//               Yes
//             </button>
//             <button onClick={handleDeleteMusic}>No</button>
//           </div>
//         </div>

//         <div>
//           {src.name && src.name.length > 60 ? (
//             <p style={{ color: "red" }}>
//               Name shoud be shorter or equal to 60!
//             </p>
//           ) : (
//             ""
//           )}
//           <p>{src.name && src.name.length}</p>
//         </div>
//       </div>
//     )}
//     <Table src={src} setSrc={setSrc} />
//     <form onSubmit={handleNewPlaylist}>
//       <input required
//       type="text"
//       placeholder="New Playlist"
//       value={disable.newPlaylist}
//       onChange={(e) => setDisable({newPlaylist: e.target.value})} />
//       <button  type="submit" disabled={!disable.newPlaylist} style={{background: disable.newPlaylist ? "" : "gray"}}>Create</button>
//     </form>
//   </div>
// );