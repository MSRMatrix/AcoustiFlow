export const handleDuration = (setDuration) => (state) => {
  const seconds = Math.floor(state % 60);
  const minutes = Math.floor((state / 60) % 60);
  const hours = Math.floor(state / 3600);
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
