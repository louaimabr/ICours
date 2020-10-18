import React, { FunctionComponent, useContext, useState } from "react";
import { firestore } from "../firebase";
import { Redirect } from "react-router-dom";
import { UserContext } from "../providers/userProvider";
import { addLeçon, setMatiereDB } from "../utils/utils";
import { MATIERE__STATE } from "./App";

interface IProps {
  modalFalse: () => void;
  handleChange: (e) => void;
  setMatieresState: (MATIERE__STATE : Array<MATIERE__STATE>) => void;
  newTitreCours: string;
  newMatiere: string;
  matieresLecon: Array<MATIERE__STATE>;
}

const Form: FunctionComponent<IProps> = ({
  modalFalse,
  handleChange,
  setMatieresState,
  newTitreCours,
  newMatiere,
  matieresLecon,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [errRepeatleçon, setErrRepeatleçon] = useState(false);

  const user = useContext(UserContext);

  //Date de création de la leçon
  const Year = new Date().getFullYear();
  const Month = new Date().getMonth();
  const Day = new Date().getDate();
  const createdAt = `${Day}/${Month + 1}/${Year}`;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(newTitreCours === '') return;
    const matieresleconSplice = [...matieresLecon];

    //Verification si la matiére à déja une matiére ou il faut la crée
    const exist = matieresleconSplice.filter((m) => m.matiere === newMatiere);
    //Nouvelle leçon
    const newCourse = {
      titre: newTitreCours,
      content: "",
      createdAt,
      matiere: newMatiere,
    };
    if (exist.length === 0) {
      const leçon: Array<{
        titre: string;
        content: string;
        createdAt: string;
        matiere: string;
      }> = [];
      leçon.push(newCourse);
      const req = {
        matiere: newMatiere,
        leçon,
      };
      await firestore
        .collection("users")
        .doc(user.uid)
        .collection("matieres")
        .doc(newMatiere)
        .set(req);

      setMatiereDB(user, setMatieresState);
      setRedirect(true);
    } else {
      matieresleconSplice.map((m) => {
        if (m.matiere === newMatiere) {
          //Virification de si le nom à déja été utilisé
          const existLeconTitle = m.leçon.find(l => l.titre === newTitreCours)

          if(!existLeconTitle){

            m.leçon.push(newCourse)
            setMatieresState(matieresleconSplice);
            addLeçon(newCourse, matieresleconSplice, user);
            setRedirect(true);

          }else{
            setErrRepeatleçon(true)
            return null;
          }
        }
        return null;
      })
    }
  };
  const handleKeyUp = (event : React.KeyboardEvent<HTMLDivElement>) =>{
    if(event.key === 'Enter'){
      event.preventDefault()
      handleSubmit(event)
    }
  }
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: `${user.uid}/${newMatiere}/${newTitreCours}`,
          state: {
            cours: {
              title: newTitreCours,
              content: "",
              matiere: newMatiere,
              createdAt,
            },
            user: user,
          },
        }}
      />
    );
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2>Commencez un nouveau cours</h2>
      <div>
        <label htmlFor="Matiére">Matiére:</label>
        <select
          name="newMatiere"
          value={newMatiere}
          onChange={(e) => handleChange(e)}
          required
        >
          <option value="Maths">Maths</option>
          <option value="Ses">Ses</option>
          <option value="Physique-Chimie">Physique-Chimie</option>
          <option value="Histoire-géo">Histoire-géo</option>
          <option value="Géopolitique">Géopolitique</option>
          <option value="SVT">Svt</option>
          <option value="Espagnol">Espagnol</option>
          <option value="Français">Français</option>
          <option value="Anglais">Anglais</option>
          <option value="Enseignement-Scientifique">Enseignement-Scientifique</option>
          <option value="Management">Management</option>
          <option value="Gestion-Numérique">Gestion Numérique</option>
          <option value="Droit">Droit</option>
        </select>
      </div>
      <div>
        <label htmlFor="title">Entrez le titre de ce cours</label>
        <input
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleChange(e)}
          onKeyDown={handleKeyUp}
          value={newTitreCours}
          type="text"
          id="title"
          name="newTitreCours"
          placeholder="Titre du cours"
          minLength={3}
          required
        />
        {errRepeatleçon && <span style={{color : 'red'}}>Ce nom est déja utilisé !</span> }
      </div>
      <div>
        <button onClick={modalFalse}>Quitter</button>
        <input type="submit" value="Confirmer" className="submitForm" />
      </div>
    </form>
  );
};

export default Form;
