const Playing = ({playing, setIsPlaying, src, setSrc}) => {

    const playFunction = () => {
        if(src.src){
           setIsPlaying((prevMod) => !prevMod) 
        }
    }

    return(
        <>
        <button onClick={playFunction}>{playing && src.src ? "Stop" : "Play"}</button>
        </>
    )
}

export default Playing;