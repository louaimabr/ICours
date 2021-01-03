import React, { useContext, useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { Redirect } from "react-router-dom";
import { MatiereContext } from "../providers/matiereProvider";

//Utils
import { setLeçon } from "../utils/utils";
import { editorConfig } from "../utils/configEditor"
//Components
import ModalConfirm from "../components/ModalConfirm";
import Dessin from "../components/Dessin";

const Editor = (props) => {
  //Handle Change Content
  const [currentContent, setCurrentContent] = useState(props.location.state ? props.location.state.cours.content : '' );
  //Si lutilisateur à changer qlq chose du contenu
  const [isChange, setIsChange] = useState(false);
  const [dessin, setDessin] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [modal, setModal] = useState(false);
  
  // Contexte de toutes les matieres from matieresProvider
  const matieresContexte = useContext(MatiereContext);

  if (!props.location.state || navigate) return <Redirect to="/matieres" />
  
  //Props with redirect {cours, user}
  const { cours, user } = props.location.state;
  let { title, createdAt, matiere } = cours;

  // La matiere qu'on traite actuellement avec cette leçon
  const currentMatiere = matieresContexte.matieresLecon.find(
    (m) => m.matiere === matiere
  );
  //handle Change
  const handleCkeditorState = (event, editor) => {
    if (!isChange) {
      setIsChange(true);
    }
    const data = editor.getData();
    setCurrentContent(data);
  };
  //Enregistrer l'image et les données dans la bdd
  const submitDessin = async (newContentDraw) =>{
    //Avoir la leçon qu'on traite actuellement avant les changements depuis le contexte qui est lui synchro avec la bdd
      let currentLeçon = currentMatiere.leçon.find((l) => l.titre === title);
       if (currentLeçon){
        //Si la leçon existe et si un changement a été effectué pour pas spam la bdd au cas ou
        currentLeçon.content = newContentDraw;
        await setLeçon(currentMatiere, user);
        matieresContexte.setMatieresLecon(matieresContexte.matieresLecon);
      }
      setIsChange(false);
    return;
  }
    //Enregistrer les données dans la bdd
  const submitContent = async () => {
      //Avoir la leçon qu'on traite actuellement avant les changements depuis le contexte qui est lui synchro avec la bdd
      let currentLeçon = currentMatiere.leçon.find((l) => l.titre === title);
       if (currentLeçon && currentLeçon.content !== currentContent){
        //Si la leçon existe et si un changement a été effectué pour pas spam la bdd au cas ou
        currentLeçon.content = currentContent;
        await setLeçon(currentMatiere, user);
        matieresContexte.setMatieresLecon(matieresContexte.matieresLecon);
      }
      setIsChange(false);
    return;
  };
  const handleAlertHome = () => {
    if (isChange) {
      setModal(true);
    } else {
      setNavigate(true);
    }
  };
  return (
    <>
      {modal && (
        <ModalConfirm>
          <h4>
            Etes vous sur de vouloir quitter sans avoir enregistrer ? <br />
            Vous risquez de prendre tout les changements que vous avez apportez
            à <span>"{title.toUpperCase()}"</span>
          </h4>
          <button onClick={() => {
            submitContent()
            setNavigate(true)
          }}>Enregistrer</button>
          <button onClick={() => setNavigate(true)}>Quitter</button>
        </ModalConfirm>
      )}
      {dessin && (
        <Dessin setDessinFalse={() => setDessin(false)} currentContent={currentContent} setCurrentContent={setCurrentContent} currentLecon={() => currentMatiere.leçon.find((l) => l.titre === title)} submitDessin={submitDessin}/>
      )}
      <div className="formNote">
        <div className="divTitleCourse">
          <div className="flecheGauche">
            <img
              src={require("../img/flecheGauche.png")}
              alt="Retourner"
              onClick={handleAlertHome}
            />
          </div>
          <div className="titleDate">
            <h3>{`${matiere} : ${title.toUpperCase()}`}</h3>
            <span>{createdAt}</span>
          </div>
          <div className="pencil">
            <img src={require("../img/pencil.png")} alt="Pencil" onClick={() => setDessin(true)}/>
          </div>
        </div>
        <button className="enregistrer" onClick={submitContent}>
          {!isChange ? (
            <img src={require('../img/check.png')} alt="Check" style={{ height : "40px", width : "40px" }}/>
          ) : (
            "Enregistrer"
          )}
          
        </button>
        <div style={{ display : 'flex' }}
          className="editorParent"
        >
          <div className="Editor">
            <CKEditor
              editor={ClassicEditor}
              onInit={(editor) => {
                //bkuud
              }}
              config={editorConfig}
              data={currentContent}
              onChange={handleCkeditorState}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
