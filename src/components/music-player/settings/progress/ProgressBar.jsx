const ProgressBar = ({ time, duration }) => {
    return (
      <>
        {time && duration ? (
          <div>
            <p>
              {time.hours}:{time.minutes}:{time.seconds} / {duration.hours}:{duration.minutes}:{duration.seconds.length >= 2 ? duration.seconds : `${duration.seconds}`}
            </p>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
  
  export default ProgressBar;
  