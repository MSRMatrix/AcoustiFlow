export const handleNewPlaylist = (e, setShowInput, currentList, newestList, setDisplayTable, showCurrentPlaylist, setCurrentList) => {
    e.preventDefault();
    setShowInput(false);
    console.log(e.target.elements.input);
    
    const newList = e.target.elements[1].value.trim();

    if (newList.length <= 0) {
      e.target.reset();
      return alert("Playlist should have a name!");
    }

    const list = Object.entries(localStorage).map((item) => item[0]);
    const checkIfThere = list.filter((item) => item === newList);

    if (newList.includes("-")) {
      alert("Playlist names cannot contain dashes (-).");
      e.target.reset();
      return;
    }

    if (checkIfThere.length >= 1) {
      alert("List already exists");
      e.target.reset();
      return;
    }
    if (newList) {
      localStorage.setItem(newList, "");
    }
    e.target.reset();
    if (currentList.length >= 1) {
      newestList(setDisplayTable, currentList[0].playlist);
      showCurrentPlaylist(setCurrentList, currentList[0].playlist);
    } else {
      newestList(setDisplayTable);
    }

    alert("New playlist created!");
  };