const Loop = ({loop, setLoop}) => {

    const loopFunction = () => {
        setLoop((prevMode) => !prevMode)
    }
    
    return(
        <>
        <button onClick={loopFunction}>{loop ? "Stop loop" : "Loop"}</button>
        </>
    )
}

export default Loop;