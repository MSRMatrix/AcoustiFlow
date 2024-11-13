export const handleSaveMusic = (src, setTakeMusic, newestList, setDisplayTable, setShowInput, setSrc) => {
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
  };

  export  const handleDeleteMusic = (setSrc, setShowInput, newestList, setDisplayTable, showCurrentPlaylist, setCurrentList) => {
    setSrc({ name: "", src: [] });
    setShowInput(false);
    newestList(setDisplayTable);
    showCurrentPlaylist(setCurrentList);
    console.log(`Song was removed!`);
  };