import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DisplayTable from "../../MusicContext/DisplayTable";
import "./lists.css";

const Lists = () => {
  const { displayTable } = useContext(DisplayTable);
  const navigate = useNavigate();

  return (
    <div className="lists">
      <h1>Playlists</h1>
      {displayTable.map((item, key) => (
        <NavLink key={key}  to={`${item.playlist}`}>
          {item.playlist}
        </NavLink>
      ))}
      <NavLink className="back-link" to="/">
        Zurück
      </NavLink>
    </div>
  );
};

export default Lists;
