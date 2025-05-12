import { NavLink } from "react-router-dom";

const Tutorial = () => {
  const language = [];
  const gif = [];
  return (
    <>
      
      <div>
      <h2>Why Third-Party Cookies? </h2>  
       <p> AcoustiFlow loads content
        from third-party providers (e.g., YouTube). These providers use
        third-party cookies to ensure the proper playback of content. If these
        cookies are disabled, the player may not function correctly.</p>
        <h1>Coming Soom...</h1>
      </div>
      <NavLink to="/">Back</NavLink>
    </>
  );
};

export default Tutorial;
