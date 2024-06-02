export const displayStorage = (setStorage) => {
    if (localStorage.getItem("your-music")) {
      const storageData = localStorage.getItem("your-music").split(", ");
      const organizedData = [];
      for (let i = 0; i < storageData.length; i += 3) {
        const name = storageData[i];
        const band = storageData[i + 1];
        const src = storageData[i + 2];

        organizedData.push({ name, band, src });
      }
      setStorage(organizedData);
    }
  };