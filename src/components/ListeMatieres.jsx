import React, { useState, useEffect} from "react";
import {Redirect} from 'react-router-dom'
import {deleLeçon} from '../utils/utils'
import ModalConfirm from "./ModalConfirm";


const ListeMatieres = ({matiereLecon,user, setCurrentLeçon}) => {
  const [displayList, setDisplayList] = useState(false);
  return (
    <>
      <div className="Mati" onClick={() => setDisplayList(!displayList)}>
        <p>{matiereLecon.matiere}</p>
        <div className="flecheMatiere">
          <img
            src={require("../img/flechBas.png")}
            alt="Fleche vers le bas"
          />
        </div>
      </div>
      <div
        className="Listlecon"
        style={{ display: !displayList ? "none" : "block" }}
      >
        <ul>
          {
              matiereLecon.leçon.map((Lecon) => {
                return(
                  <EachMatiere key={Lecon.titre} user={user} matiereLecon={matiereLecon} lecon={Lecon} setCurrentLeçon={setCurrentLeçon}/>
                )
              })
          }
        </ul>
      </div>
    </>
  );
};
const EachMatiere = ({user,matiereLecon, lecon, setCurrentLeçon}) => {
  const [showModal, setShowModal] = useState(false)
  const [redirect, setRedirect] = useState(false)
  useEffect(() =>{
    if(redirect){
      setCurrentLeçon({
        cours: {
            title: lecon.titre,
            content: lecon.content,
            matiere: lecon.matiere,
            createdAt: lecon.createdAt,
        },
        user
    })
    }
  })
  if(redirect) return <Redirect push to="/leçon"/>
  return (
    <div>
    {showModal && (
      <ModalConfirm>
        <p>Êtes vous sur de vouloir supprimmer "{lecon.titre.toUpperCase()}"</p> ?
        <button onClick={() => setShowModal(false)}>Annuler</button>
        <button onClick={async () => {
          await deleLeçon(lecon.titre, matiereLecon, user)
          setShowModal(false)
        }}>Supprimmer</button>
      </ModalConfirm>
    )}
      <li onClick={() => setRedirect(true)}>{lecon.titre.toUpperCase()}</li>
      <button onClick={() => setShowModal(true)}>X</button>
  </div>
  );
};
export default ListeMatieres;
