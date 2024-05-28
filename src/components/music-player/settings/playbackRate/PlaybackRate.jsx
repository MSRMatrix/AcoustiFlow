const PlaybackRate = ({ playbackRate, setPlaybackRate }) => {


    const selectRate = (e) => {
        const test = Number(e.target.value)
        setPlaybackRate(test) 
    }
    
  return (
    <>
      <select onChange={selectRate}>
      <option value="Select a rate" defaultValue={"Select a rate"}>Select a rate</option>
        <option value={0.2}>0.2</option>
        <option value={0.6}>0.6</option>
        <option value={1.0}>1.0</option>
        <option value={1.4}>1.4</option>
        <option value={2.0}>2.0</option>
      </select>
    </>
  );
};

export default PlaybackRate;
