import { useEffect, useState } from "react";

const Table = ({src, setSrc}) => {
const [storage, setStorage] = useState([])
     

const displayStorage = () => {
    if(localStorage.getItem("your-music")) {
        const storageData = localStorage.getItem("your-music").split(", ");
        const organizedData = [];

        for (let i = 0; i < storageData.length; i += 3) {
            const name = storageData[i];
            const band = storageData[i + 1];
            const src = storageData[i + 2];

            organizedData.push({ name, band, src });
        }

        setStorage(organizedData);
    }
}

    useEffect(() => {
        displayStorage()
    },[])
    console.log(storage);
    return(
        <>
        <table>
            <tr>
                <th>Song</th>
                <th>Band</th>
            </tr>
         {storage.length > 0 ? storage.map((item) => 
            <tr key={item.src}>
                <tb>{item.name}</tb>
                <tb>{item.band}</tb>
            </tr>
         ) : <p>Du hast noch keine Daten gespeichert!</p>}   
        </table>
         
        </>
    )
}

export default Table