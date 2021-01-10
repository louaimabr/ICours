import React, { FC } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../firebase";
import {Navbar, Nav} from 'react-bootstrap'

const NavbarConnect: FC = () => {
  return (
    <Navbar expand="lg">
      <div className="container">
        <div className="brandNav">
        <Navbar.Brand>
          <img src={require('../img/newLogo.png')} className="imgNav" alt=""/>
        </Navbar.Brand>
        <hr/>
        <Navbar.Brand style={{ color: "white", fontFamily: '"Permanent Marker", cursive' }}>
          IKours
        </Navbar.Brand>
      </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ml-auto">
            <Link to="/">Accueil</Link>
            <Link to="/matieres">Leçon</Link>
            {/* <Link to="/amis">Amis</Link> */}
            <Nav.Link  style={{ color: "white" }} href="https://louaimab.com/">A propos de moi</Nav.Link>
            <Nav.Link onClick={signOut} style={{ color: "red" }}>Déconnexion</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
  </Navbar>
  );
};

export default NavbarConnect;

