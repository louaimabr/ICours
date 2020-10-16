import React, { FC } from "react";
import { USER } from "../pages/Comp";
interface IProps {
  modalTrue: () => void;
  user: USER;
}
const CreateCourse: FC<IProps> = ({ modalTrue, user }) => {
  const { displayName, photoURL, createdAt } = user;
  return (
    <>
      <div className="CreateCourse">
        <div>
          <div className="userInfo">
            <img src={photoURL} alt={displayName} />
            <div>
              <p>
                Nom : <span>{displayName}</span>
              </p>
              <p>
                A rejoint le : <span>{createdAt}</span>
              </p>
            </div>
          </div>
          <div className="welcome">
            <h2>Bienvenue {displayName}</h2>
          </div>
        </div>
      </div>
      <div className="btnCreate">
        <button onClick={modalTrue}> Créer un nouveau cours</button>
      </div>
    </>
  );
};

export default CreateCourse;
