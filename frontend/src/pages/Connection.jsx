import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Connection() {
  const [isLogin, setIslogin] = useState(true);
  return (
    <div className="connect">
      <h1>Bienvenue!</h1>
      <div className="form-connection">
        <div className="change-connect">
          <button
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => {
              setIslogin(true);
            }}
          >
            Connexion
          </button>
          <button
            type="button"
            className={isLogin ? "" : "active"}
            onClick={() => {
              setIslogin(false);
            }}
          >
            Enregistrement
          </button>
        </div>
        {isLogin ? <Login /> : <Register setIslogin={setIslogin} />}
      </div>
    </div>
  );
}
