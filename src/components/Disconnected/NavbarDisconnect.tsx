import React from "react";

const NavbarDisconnect = () => {
  return (
    <nav className="navDisconnect">
      <div id="triangle-right"></div>
      <div className="navCenter">
        <div>
          <img src={require("../../img/newLogo.png")} alt="Logo" />
          <hr />
          <h1>IKours</h1>
        </div>
        <a
          href="https://louaimab.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          A propos de moi
        </a>
      </div>
      <div id="triangle-left"></div>
    </nav>
  );
};

export default NavbarDisconnect;
