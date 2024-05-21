const Muted = ({muted, setMuted}) => {

    const mutedFunction = () => {
        setMuted((prevMode) => !prevMode)
    }
    return(
        <>
        <button onClick={mutedFunction}>{muted ? "Unmuted" : "Muted"}</button>
        </>
    )
}

export default Muted;