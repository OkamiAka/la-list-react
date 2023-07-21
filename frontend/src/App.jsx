import { Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import Connection from "./pages/Connection";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Figurine from "./pages/Figurine";
import Pop from "./pages/Pop";

import "./App.scss";
import Mug from "./pages/Mug";

function App() {
  const { token } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Connection />} />
        {token && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/figurine/:id" element={<Figurine />} />
            <Route path="/mug/:id" element={<Mug />} />
            <Route path="/pop/:id" element={<Pop />} />
            <Route
              path="*"
              element={
                <>
                  <Nav />
                  <p>?</p>
                </>
              }
            />
          </>
        )}
        <Route path="*" element={<Connection />} />
      </Routes>
    </div>
  );
}

export default App;
