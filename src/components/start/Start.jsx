import { NavLink, Outlet } from "react-router-dom"

const Start = () => {
    return(
        <div>
        <NavLink to="/music-player">Music Player</NavLink>
        <NavLink to="/video-player">Video Player</NavLink>
        
        <Outlet />
</div>
    )
}

export default Start