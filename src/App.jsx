import { Outlet, Router, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Start from './components/start/Start'
import MusicPlayer from './components/music-player/MusicPlayer'
import VideoPlayer from './components/video-player/VideoPlayer'
import { useState } from 'react'
import Data from "./components/music-player/data/Data"
import DisplayTable from './components/music-player/MusicContext/DisplayTable'
import Storage from './components/music-player/MusicContext/Storage'
import PlaylistContext from './components/music-player/MusicContext/PlaylistContext'
import ShowInput from './components/music-player/MusicContext/ShowInput'


const router = createBrowserRouter ([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/music-player",
    element: <MusicPlayer />
  },
  {
    path: "/video-player",
    element: <VideoPlayer />
  },
  {
    path: "/import-export",
    element: <Data />
  }
])

function App() {
  const [displayTable, setDisplayTable] = useState([])
  const [storage, setStorage] = useState([])
  const [playlistContext, setPlaylistContext] = useState([])
  const [showInput, setShowInput] = useState(false)
  return (
    <>
    <ShowInput.Provider value={{showInput, setShowInput}}>
    <PlaylistContext.Provider value={{playlistContext, setPlaylistContext}}>
    <Storage.Provider value={{storage, setStorage}}>
    <DisplayTable.Provider value={{displayTable, setDisplayTable}}>
    <RouterProvider router={router} /> 
    </DisplayTable.Provider>
    </Storage.Provider>
    </PlaylistContext.Provider>
    </ShowInput.Provider>
    </>
  )
}

export default App
