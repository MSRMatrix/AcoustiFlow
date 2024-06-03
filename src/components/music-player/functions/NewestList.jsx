export const newestList = (setAllPlaylists) => {
    const playlists = Object.entries(localStorage)
        .filter((item) => item[0] !== "your-music")
        .map((item) => {
            const songsArray = item[1].split(", ").reduce((acc, curr, index, array) => {
                if (index % 2 === 0) {
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
    setAllPlaylists(playlists);
};