import { Outlet, Router, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Start from './components/start/Start'
import MusicPlayer from './components/music-player/MusicPlayer'
import VideoPlayer from './components/video-player/VideoPlayer'
import { useState } from 'react'
import MusicContext from './components/music-player/MusicContext/MusicContext'



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
  }
])

function App() {
  const [musicContext, setMusicContext] = useState([])
  return (
    <>
    <MusicContext.Provider value={{musicContext, setMusicContext}}>
    <RouterProvider router={router} /> 
    </MusicContext.Provider>
    
    </>
  )
}

export default App
