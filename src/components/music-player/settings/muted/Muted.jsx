const Muted = ({muted, setMuted}) => {

    const mutedFunction = () => {
        setMuted((prevMode) => !prevMode)
    }
    return(
        <>
        <button onClick={mutedFunction}>{!muted ? <i className="fa-solid fa-volume-high"></i> : <i className="fa-solid fa-volume-xmark"></i>}</button>
        </>
    )
}

export default Muted;