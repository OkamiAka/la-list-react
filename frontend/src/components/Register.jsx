import PropTypes from "prop-types";
import { useRef } from "react";

export default function Register({ setIslogin }) {
  const usernameRef = useRef();
  const nameRef = useRef();
  const lastnameRef = useRef();
  const passwordRef = useRef();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        fetch(
          `${
            import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
          }/users`,
          {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              username: usernameRef.current.value,
              password: passwordRef.current.value,
              lastname: lastnameRef.current.value,
              firstname: nameRef.current.value,
            }),
          }
        ).then((response) => {
          if (response.ok) {
            setIslogin(true);
          }
        });
      }}
    >
      <h2>Enregistrement</h2>
      <div className="form-line">
        <label htmlFor="login">Nom Utilisateur:</label>
        <input ref={usernameRef} id="login" type="text" required />
      </div>
      <div className="form-line">
        <label htmlFor="name">Nom:</label>
        <input ref={nameRef} id="name" type="text" required />
      </div>
      <div className="form-line">
        <label htmlFor="lastname">Prenom:</label>
        <input ref={lastnameRef} id="lastname" type="text" required />
      </div>
      <div className="form-line">
        <label htmlFor="mdp">Mot de passe:</label>
        <input ref={passwordRef} id="mdp" type="password" required />
      </div>
      <button type="submit">✔</button>
    </form>
  );
}

Register.propTypes = {
  setIslogin: PropTypes.func.isRequired,
};
