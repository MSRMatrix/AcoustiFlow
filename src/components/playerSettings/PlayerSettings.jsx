const PlayerSettings = ({fakeRouter, setFakeRouter}) => {
    return(
        <div  style={{ display: fakeRouter === "Player Settings" ? "block" : "none" }}>
          <h1>Player Settings</h1>  
        <div>
           <h2>Change Color</h2> 

         <input type="color" name="" id="" />   
        </div>


        
        <div></div>
        <div></div>
        <div></div>


        <div
          className="back-link"
          onClick={() => {
            setFakeRouter("");
          }}
          style={{ display: fakeRouter ? "block" : "none" }}
        >
          Back
        </div>
        </div>
    )
}

export default PlayerSettings;