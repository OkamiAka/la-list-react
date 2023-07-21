import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useAuth } from "../contexts/AuthContext";

export default function Mug() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();

  const [mugs, setmugs] = useState([]);
  const [add, setAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const [licences, setLicences] = useState([]);
  const [marques, setMarques] = useState([]);

  const imgRef = useRef();
  const nameRef = useRef();
  const licenceIdRef = useRef();
  const marqueIdRef = useRef();
  const comRef = useRef();
  const userIdRef = useRef();
  const viewRef = useRef();

  const datas = () => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/mugs/${id}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setmugs(res);
      });
  };

  useEffect(() => {
    datas();
  }, [id, add]);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/users`,
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

    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/licences`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setLicences(res);
      });
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/marques`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setMarques(res);
      });
  }, []);
  const view = (mId) => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/mugs/${mId}/view`,
      {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        datas();
      }
    });
  };
  return (
    <>
      <Nav />
      <select
        onChange={(e) => navigate(`/mug/${e.target.value}`)}
        name="user"
        id="user"
      >
        {users.map((user) =>
          user.id === parseInt(id, 10) ? (
            <option key={user.id} value={user.id} selected>
              {user.lastname} {user.firstname}
            </option>
          ) : (
            <option key={user.id} value={user.id}>
              {user.lastname} {user.firstname}
            </option>
          )
        )}
      </select>
      <br />
      {add ? (
        <>
          <button type="button" onClick={() => setAdd(false)}>
            Return
          </button>
          <form
            className="add"
            onSubmit={(event) => {
              event.preventDefault();
              fetch(
                `${
                  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
                }/mugs`,
                {
                  method: "post",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    img:
                      imgRef.current.value.length > 0
                        ? imgRef.current.value
                        : null,
                    name: nameRef.current.value,
                    licence: parseInt(licenceIdRef.current.value, 10),
                    marque: parseInt(marqueIdRef.current.value, 10),
                    com:
                      comRef.current.value.length > 0
                        ? comRef.current.value
                        : null,
                    userId: parseInt(userIdRef.current.value, 10),
                    view: parseInt(viewRef.current.value, 10),
                  }),
                }
              ).then((response) => {
                if (response.ok) {
                  setAdd(false);
                }
              });
            }}
          >
            <h2>Nouveau Mug</h2>
            <div className="form-line">
              <label htmlFor="img">image:</label>
              <input ref={imgRef} id="img" type="text" />
            </div>
            <div className="form-line">
              <label htmlFor="name">Nom:</label>
              <input ref={nameRef} id="name" type="text" required />
            </div>
            <div className="form-line">
              <label htmlFor="licence">Licence:</label>
              <select ref={licenceIdRef} name="licence" id="licence">
                <option>---ici---</option>
                {licences.map((licence) => (
                  <option key={licence.id} value={licence.id}>
                    {licence.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-line">
              <label htmlFor="marque">Marque:</label>
              <select ref={marqueIdRef} name="marque" id="marque">
                <option>---ici---</option>
                {marques.map((marque) => (
                  <option key={marque.id} value={marque.id}>
                    {marque.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-line">
              <label htmlFor="com">Commentaire:</label>
              <input ref={comRef} id="com" type="text" />
            </div>
            <div className="form-line">
              <label htmlFor="user">Ajouter a:</label>
              <select ref={userIdRef} name="user" id="user">
                <option value="">---qui?---</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.lastname} {user.firstname}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-line">
              <label htmlFor="view">Visible:</label>
              <select ref={viewRef} name="view" id="view">
                <option value={0}>non</option>
                <option value={1}>oui</option>
              </select>
            </div>
            <button type="submit">Ajouter</button>
          </form>
        </>
      ) : (
        <>
          <button type="button" onClick={() => setAdd(true)}>
            Ajouter
          </button>
          {mugs.map((licence) => (
            <div key={licence.id} className="list">
              <h2>{licence.licence_name}</h2>
              <div>
                {licence.datas.map((mug) => (
                  <figure
                    key={mug.id}
                    style={
                      parseInt(mug.view, 10) === 0 ? { borderColor: "red" } : {}
                    }
                  >
                    <img src={mug.img} alt={mug.name} />
                    <section>
                      <p>{mug.name}</p>
                      <p>{mug.com}</p>
                      <p>{mug.marque}</p>
                      {mug.view === 0 && (
                        <button type="button" onClick={() => view(mug.id)}>
                          view
                        </button>
                      )}
                    </section>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
