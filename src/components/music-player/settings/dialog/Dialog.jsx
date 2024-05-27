import "./dialog.css";

const PlaylistChanger = ({ setIsOpen, src, setSrc, takeMusic }) => {
  const storage = Object.entries(localStorage);
  let allLists;
  let defaultList;

  if (storage) {
    const newList = storage.map((item) => item[0]);
    allLists = newList.filter((item) => item !== "your-music");
    defaultList = newList.filter((item) => item === "your-music");
  }

  const addToNewPlaylist = (playlist) => {
    const random = Object.values(takeMusic);
   const list = Object.entries(localStorage).filter((item) => item[0] === playlist);
   console.log(list[0][1].split(", "));
   
    
    if(list[0][1].split(", ").length >= 3){
       const newData =
      localStorage.getItem(playlist) +
      ", " +
      random[0] +
      ", " +
      random[1] +
      ", " +
      random[2];
    return localStorage.setItem(playlist, newData); 
    }
    const newData =
      localStorage.getItem(playlist) +
      random[0] +
      ", " +
      random[1] +
      ", " +
      random[2];

     return localStorage.setItem(playlist, newData); 
  };

  return (
    <dialog open>
      <div className="playlist-changer">
        Zur welchen Playlist soll dein Lied hinzugefügt werden?
        {allLists.map((item, key) => (
          <button onClick={() => addToNewPlaylist(item)} key={key}>
            {item}
          </button>
        ))}
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </dialog>
  );
};

export { PlaylistChanger };
