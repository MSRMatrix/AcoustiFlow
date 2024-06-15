export const handleDuration = (setDuration) => (duration) => {
  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor(duration / 60);
  setDuration({
    seconds: seconds < 10 ? '0' + seconds : seconds,
    minutes: minutes < 10 ? '0' + minutes : minutes,
  });
};

export const handleProgress = (setTime) => (state) => {
  const seconds = Math.floor(state.playedSeconds % 60);
  const minutes = Math.floor(state.playedSeconds / 60);
  setTime({
    seconds: seconds < 10 ? '0' + seconds : seconds,
    minutes: minutes < 10 ? '0' + minutes : minutes,
  });
};
