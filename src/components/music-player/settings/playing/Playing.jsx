const Playing = ({playing, setIsPlaying}) => {

    const playFunction = () => {
        setIsPlaying((prevMod) => !prevMod)
    }

    return(
        <>
        <button onClick={playFunction}>{playing ? "Stop" : "Play"}</button>
        </>
    )
}

export default Playing;