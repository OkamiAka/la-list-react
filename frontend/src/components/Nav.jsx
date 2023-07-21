import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { BiSolidUserDetail } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";

export default function Nav() {
  const { token, setToken } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/user`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          return response.status;
        }
        return response.json();
      })
      .then((res) => {
        if (res === 401) {
          sessionStorage.removeItem("token");
          setToken(null);
        } else {
          setUser(res);
        }
      });
  }, []);

  return (
    <nav>
      <Link to="/home" data-item="Home">
        <img
          src={user.img ?? "https://source.boringavatars.com/beam/"}
          alt={user.username}
        />
      </Link>
      <ul className="menuItems">
        <li>
          <Link to="/home" data-item="Home">
            Home
          </Link>
        </li>
        <li>
          <Link to={`/figurine/${user.id}`} data-item="Figurine">
            Figurine
          </Link>
        </li>
        <li>
          <Link to={`/pop/${user.id}`} data-item="POP">
            POP
          </Link>
        </li>
        <li>
          <Link to={`/mug/${user.id}`} data-item="Mug">
            Mug
          </Link>
        </li>
      </ul>
      <BiSolidUserDetail size="3rem" className="profile" />
      <Tooltip
        className="tooltip"
        classNameArrow="arrow-tooltip"
        anchorSelect=".profile"
        clickable
      >
        <div>
          <img
            src={user.img ?? "https://source.boringavatars.com/beam/"}
            alt={user.username}
          />
          <p>Username: {user.username}</p>
          <p>Nom: {user.firstname}</p>
          <p>Prenom: {user.lastname}</p>
          <button type="button">Modifier vos informations</button>
        </div>
      </Tooltip>
    </nav>
  );
}
