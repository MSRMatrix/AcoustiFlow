import { NavLink } from "react-router-dom";

const Tutorial = ({fakeRouter, setFakeRouter}) => {
  const language = [];
  const gif = [];
  return (
    <>
      
      <div  style={{display: fakeRouter === "Tutorial" ? "block" : "none"}}>
      <h2>Why Third-Party Cookies? </h2>  
       <p> AcoustiFlow loads content
        from third-party providers (e.g., YouTube). These providers use
        third-party cookies to ensure the proper playback of content. If these
        cookies are disabled, the player may not function correctly.</p>
        <h1>Coming Soom...</h1>
       <div className="back-link" onClick={() => setFakeRouter("")}>Back</div> 
      </div>
      
    </>
  );
};

export default Tutorial;
