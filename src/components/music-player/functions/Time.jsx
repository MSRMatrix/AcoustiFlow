export const handleDuration = (setDuration) => (duration) => {
  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor((duration / 60) % 60);
  const hours = Math.floor(duration / 3600);
  setDuration({
    hours: hours < 10 ? '0' + hours : hours,
    minutes: minutes < 10 ? '0' + minutes : minutes,
    seconds: seconds < 10 ? '0' + seconds : seconds,
  });
};

export const handleProgress = (setTime) => (state) => {
  const seconds = Math.floor(state.playedSeconds % 60);
  const minutes = Math.floor((state.playedSeconds / 60) % 60);
  const hours = Math.floor(state.playedSeconds / 3600);
  setTime({
    hours: hours < 10 ? '0' + hours : hours,
    minutes: minutes < 10 ? '0' + minutes : minutes,
    seconds: seconds < 10 ? '0' + seconds : seconds,
  });
};
