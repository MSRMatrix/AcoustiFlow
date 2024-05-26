import "./dialog.css"

const PlaylistChanger = ({setIsOpen, src, setSrc, takeMusic}) => {
    
    const storage = Object.entries(localStorage)
    let allLists;
    let defaultList;
    
    if(storage){
      const newList = storage.map((item) => item[0])
      allLists = newList.filter((item) => item !== "your-music")
      defaultList = newList.filter((item) => item === "your-music")
    }

    const addToNewPlaylist = (playlist) => {

        const random = Object.values(takeMusic)
                const newData = localStorage.getItem(playlist)  + ", " + random[0] + ", " + random[1] + ", " + random[2]              
               localStorage.setItem(playlist, newData)       
   } 
    return(
        <dialog open>
            <div className="playlist-changer" >
            Zur welchen Playlist soll dein Lied hinzugefügt werden?
            {allLists.map((item, key) => <button onClick={() => addToNewPlaylist(item)} key={key}>{item}</button>)}
            <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
        </dialog>
    )
}

export {PlaylistChanger}