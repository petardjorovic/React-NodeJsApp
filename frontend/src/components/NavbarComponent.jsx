import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ToggleModeComponent from "./ToggleModeComponent";
import { SiElectron } from "react-icons/si";

function NavbarComponent({ darkMode, setDarkMode }) {
  const [MenuItems, setMenuItems] = useState([
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/products",
      label: "Products",
    },
    {
      path: "/about",
      label: "About",
    },
    {
      path: "/contact",
      label: "Contact",
    },
  ]);
  return (
    <header className="container mx-auto bg-green-200 text-slate-900 h-[80px] flex items-center justify-center dark:bg-green-900 dark:text-slate-200">
      <nav className="w-[95%] flex items-center justify-between">
        <h1 className="flex items-center gap-[10px] text-2xl">
          <Link to={"/"}>
            <SiElectron size={45} />
          </Link>{" "}
          Electron Shop
        </h1>
        <ToggleModeComponent darkMode={darkMode} setDarkMode={setDarkMode} />
        <ul className="flex items-center gap-[20px]">
          {MenuItems.map((el, i) => {
            return (
              <li key={i}>
                <NavLink to={el.path}>{el.label}</NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default NavbarComponent;
