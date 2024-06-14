const Playing = ({playing, setIsPlaying, src, setSrc}) => {

    const playFunction = () => {
        if(src.src){
           setIsPlaying((prevMod) => !prevMod) 
        }
    }

    return(
        <>
        <button onClick={playFunction}>{playing && src.src ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
        </>
    )
}

export default Playing;