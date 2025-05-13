import { NavLink, Outlet } from "react-router-dom";

const MusicPlayerWindow = () => {
  return (
    <div className="home-window">
      <h1>Menu</h1>
      <NavLink to="/lists">Lists</NavLink>
      <NavLink to="/new-list">Add new List</NavLink>
      <NavLink to="/add-music">Add new Music</NavLink>
      <NavLink to="/tutorial">Tutorial</NavLink>
      <NavLink to="/import-export">Import/export data</NavLink>
      <NavLink to="/settings">Settings</NavLink>
      <Outlet />
    </div>
  );
};

export default MusicPlayerWindow;
