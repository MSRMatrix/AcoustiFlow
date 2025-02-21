export const handleSaveMusic = (src, setTakeMusic, newestList, setDisplayTable, setShowInput, setSrc, setTitle) => {
    const newData = {
      name: src.name,
      src: src.src,
    };

    if (!src.name || !src.src) {
     return alert("Should not be empty!");
      
    }
    setTakeMusic(newData);
    newestList(setDisplayTable);
    setShowInput(false);
    setSrc({ name: "", src: [] });
    setTitle("")
  };

  export  const handleDeleteMusic = (setSrc, setShowInput, newestList, setDisplayTable, showCurrentPlaylist, setCurrentList, setTitle) => {
    setSrc({ name: "", src: [] });
    setShowInput(false);
    newestList(setDisplayTable);
    showCurrentPlaylist(setCurrentList);
    setTitle("")
    console.log(`Song was removed!`);
  };