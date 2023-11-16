import { Home } from "./assets/Pages/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./assets/Pages/Login/Login";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
