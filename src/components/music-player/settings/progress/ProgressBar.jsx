const ProgressBar = ({src, time, duration }) => {
    return (
      <>
        {src && src.src && src.src.length > 0 && time && duration ? (
          <div>
            <p>
              {time.hours}:{time.minutes}:{time.seconds} / {duration.hours}:{duration.minutes}:{duration.seconds.length >= 2 ? duration.seconds : `${duration.seconds}`}
            </p>
          </div>
        ) : (
          <p>No music played</p>
        )}
      </>
    );
  }
  
  export default ProgressBar;
  