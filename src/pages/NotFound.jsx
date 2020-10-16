import React, { useEffect, useState } from 'react';
import {Link, Redirect} from "react-router-dom"
import Navbar from '../components/Navbar';
import SvgTemplate from '../components/SvgTemplate';

const NotFound = () => {
    const [navigate, setNavigate] = useState(false)
    useEffect(() =>{
        setTimeout(() =>{
            setNavigate(true)
        },5500)
    }, [])
    if(navigate) return <Redirect to="/"/>
    return (
        <>
        <SvgTemplate>
            <Navbar />
            <div className="notfound">
                <p>
                Erreur 404 | Il n'y a rien ici ! <br/>
                Retournez à la page d'acceuil en cliquant<Link to="/"> ici </Link>ou patientez 5 secondes.
                </p>
            </div>
        </SvgTemplate>
        </>
    );
};

export default NotFound;