export const newestList = (setDisplayTable, playlist = null) => {
    const playlists = Object.entries(localStorage)
      .filter((item) => !playlist || item[0] !== playlist)
      .map((item) => {
        const songsArray = item[1].split(", ").reduce((acc, curr, index, array) => {
          if (index % 2 === 0 && array[index + 1] !== undefined) {
            const song = {
              name: array[index],
              src: array[index + 1],
            };
            acc.push(song);
          }
          return acc;
        }, []);
        return { playlist: item[0], songs: songsArray };
      });
  
      setDisplayTable(playlists);
  };
  