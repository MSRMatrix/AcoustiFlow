const ProgressBar = ({time, duration}) => {
    
    return(
        <>
       {time && duration ? <div><p>{time.minutes}:{(time.seconds)}/{duration.minutes}:{(duration.seconds - 1)}</p></div> : <></>}
        </>
    )
}

export default ProgressBar