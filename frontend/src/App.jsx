import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      localStorage.theme = "dark";
      document.querySelector("html").classList.add("dark");
    } else {
      localStorage.theme = "";
      document.querySelector("html").classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="container mx-auto">
      <NavbarComponent darkMode={darkMode} setDarkMode={setDarkMode} />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
