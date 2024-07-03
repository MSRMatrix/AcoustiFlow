const ProgressBar = ({ time, duration }) => {
    return (
      <>
        {time && duration ? (
          <div>
            <p>
              {time.hours}:{time.minutes}:{time.seconds} / {duration.hours}:{duration.minutes}:{duration.seconds - 1}
            </p>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
  
  export default ProgressBar;
  