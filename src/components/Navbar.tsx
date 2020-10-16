import React, { FC } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../firebase";
const Navbar: FC = () => {
  return (
    <nav className="nav">
      <div className="navCenter">
        <div>
          <img src={require("../img/newLogo.png")} alt="Logo" />
          <hr />
          <h1>ICours</h1>
        </div>
        <ul>
          <Link to="/">Acceuil</Link>
          <Link to="/matieres">Leçon</Link>
          <a
            href="https://louaimab.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            A propos de moi
          </a>
          <li onClick={signOut} style={{ color: "red" }}>
            Déconnexion
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
