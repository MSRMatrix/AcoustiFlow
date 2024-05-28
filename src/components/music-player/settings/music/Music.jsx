import Table from "./table/Table";

const Music = ({src, setSrc}) => {

    const takeUrl = (e) => {
        e.preventDefault();
        
        const newSrc ={
            name: e.target.elements.name.value,
            band: e.target.elements.band.value,
            src: e.target.elements.src.value,
         }

         setSrc(newSrc)
         e.target.reset()
    }

    const safeMusic = () => {
        const storage = localStorage.getItem("your-music");
        const newData = `${src.name}, ${src.band}, ${src.src}`;

        if (!src.name || !src.band || !src.src) {
            alert("Diese Felder dürfen nicht leer sein!");
            return;
        }
        if (storage) {
            const existingData = storage.split(", ").map(item => item.trim());
            if (existingData.includes(src.src)) {
                alert("Dieses Lied existiert schon!");
                setSrc([]);
                return;
            }
            const updatedData = `${storage}, ${newData.trim()}`;
            localStorage.setItem("your-music", updatedData);
        } else {
            localStorage.setItem("your-music", newData);
        }
    
        setSrc([]);
    };
    
    

    const deleteMusic = () => {
        setSrc([])
        console.log(`Dieses Lied wurde entfernt!`);
    }

    const newPlaylist = (e) => {
        e.preventDefault()
        const newList = e.target.elements[0].value.trim()
        if(newList){
           localStorage.setItem(newList, "") 
        }
        e.target.reset()
    }

    return(
        <>
        
        <form action="" onSubmit={takeUrl}>
        <input type="text" name="name" required placeholder="Song Name"/>
        <input type="text" name="band" required placeholder="Band Name"/>
        <input type="url" name="src" required placeholder="Put in your favorite music"/>
        <button type="submit">Abspielen</button>
        </form>
        {src.src ? <div>
        <p>Möchten Sie dieses Lied speichern?</p>
        <button onClick={safeMusic}>Ja</button>
        <button onClick={deleteMusic}>Nein</button>
        </div> : <></>}

        <Table src={src} setSrc={setSrc} />
        <form action="" onSubmit={newPlaylist}>
            <input type="text" />
        <button type="submit">Neue Playlist erstellen</button>    
        </form>
        
        </>
    )
}

export default Music;