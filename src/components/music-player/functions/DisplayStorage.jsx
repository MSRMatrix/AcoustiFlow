export const displayStorage = (setStorage) => {
    if (localStorage.getItem("your-music")) {
      const storageData = localStorage.getItem("your-music").split(", ");
      const organizedData = [];
      for (let i = 0; i < storageData.length; i += 2) {
        const name = storageData[i];
        const src = storageData[i + 1];

        organizedData.push({ name, src });
      }
      setStorage(organizedData);
    }
  };