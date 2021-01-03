import React, { useState } from "react";
import { Link } from "react-router-dom";
import {deleLeçon} from '../utils/utils'
import ModalConfirm from "./ModalConfirm";


const ListeMatieres = ({matiereLecon,user}) => {
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
              matiereLecon.leçon.map((currentLecon) => {
                return(
                  <EachMatiere key={currentLecon.titre} user={user} matiereLecon={matiereLecon} lecon={currentLecon}/>
                )
              })
          }
        </ul>
      </div>
    </>
  );
};
const EachMatiere = ({user,matiereLecon, lecon}) => {
  const [showModal, setShowModal] = useState(false)

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
    <Link
      to={{
        pathname: `${user.uid}/${lecon.matiere}/${lecon.titre}`,
        state: {
          cours: {
            title: lecon.titre,
            content: lecon.content,
            matiere: lecon.matiere,
            createdAt: lecon.createdAt,
          },
          user,
        },
      }}> 
      <li>{lecon.titre.toUpperCase()}</li>
      </Link>
      <button onClick={() => setShowModal(true)}>X</button>
  </div>
  );
};
export default ListeMatieres;
