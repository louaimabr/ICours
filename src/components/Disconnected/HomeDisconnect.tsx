import React from "react";
import { signInWithGoogle } from "../../firebase";
import NavbarDisconnect from "./NavbarDisconnect";
const HomeDisconnect = () => {
  return (
    <div className="homeDisconnect">
      <NavbarDisconnect />
      <div className="intro">
        <div className="connectIntro">
          <h2>Simplifiez vous cours à distance </h2>
          <p>
            IKours est une plateforme qui vous permet de prendre notes de vos
            cours à distance facilement
          </p>
          <button onClick={signInWithGoogle}>
            Inscrivez / Connectez vous avec
            <img src={require("../../img/google.png")} alt="" /> gratuitement
          </button>
        </div>
        <img src={require("../../img/pc.png")} alt="" />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ backgroundColor: " #2a1b3d", transform: "rotate(180deg)" }}
      >
        <path
          fill="#eea9a1"
          fillOpacity="1"
          d="M0,96L120,128L240,96L360,0L480,256L600,64L720,224L840,160L960,128L1080,64L1200,256L1320,128L1440,160L1440,320L1320,320L1200,320L1080,320L960,320L840,320L720,320L600,320L480,320L360,320L240,320L120,320L0,320Z"
        ></path>
      </svg>
      <div className="idées">
        <div className="interrogation">
          <img src={require("../../img/interro.svg")} alt="interrogation" />
        </div>
        <div className="contentIdées">
          <p>Prenez des notes de vos cours et enregistrez les.</p>
          <hr />
          <p>
            Accedez à vos cours quand vous voulez et ou vous voulez
            gratuitement.
          </p>
        </div>
      </div>
      <footer></footer>
    </div>
  );
};

export default HomeDisconnect;
