import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const usernameRef = useRef();
  const passwordRef = useRef();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        fetch(
          `${
            import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
          }/login`,
          {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              username: usernameRef.current.value,
              password: passwordRef.current.value,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.token !== null) {
              setToken(data.token);
              sessionStorage.setItem("token", data.token);
              navigate("/home");
            } else {
              alert("err");
            }
          });
      }}
    >
      <h2>Connexion</h2>
      <div className="form-line">
        <label htmlFor="username">Nom Utilisateur:</label>
        <input
          ref={usernameRef}
          id="username"
          type="text"
          name="username"
          required
        />
      </div>
      <div className="form-line">
        <label htmlFor="mdp">Mot de passe:</label>
        <input ref={passwordRef} id="mdp" type="password" name="mdp" required />
      </div>
      <button type="submit">✔</button>
    </form>
  );
}
