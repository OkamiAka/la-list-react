import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/users/liste`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setUsers(res);
      });
  }, []);
  return (
    <>
      <Nav />
      <div className="home">
        {users.map((user) => (
          <figure key={user.id}>
            <img
              src={user.img ?? "https://source.boringavatars.com/beam/"}
              alt={user.username}
            />
            <section>
              <Link to={`/user/${user.id}`}>
                <h2>
                  {user.lastname} {user.firstname}
                </h2>
              </Link>
              <Link to={`/figurine/${user.id}`}>
                <p>{user.nb_figurine ?? 0} figurine</p>
              </Link>
              <Link to={`/pop/${user.id}`}>
                <p>{user.nb_pop ?? 0} pop</p>
              </Link>
              <Link to={`/mug/${user.id}`}>
                <p>{user.nb_mug ?? 0} mug</p>
              </Link>
            </section>
          </figure>
        ))}
      </div>
    </>
  );
}
