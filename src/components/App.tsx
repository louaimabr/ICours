import React, { Component } from "react";
import "../scss/App.scss";
//Components
import Navbar from "./Navbar";
import CreateCourse from "./CreateCourse";
import ModalForm from "./ModalForm";
import Form from "./Form";
import SvgTemplate from "./SvgTemplate";
//Interfaces
export interface MATIERE__STATE {
  leçon: Array<{
    createdAt: string;
    titre: string;
    matiere: string;
    content: string;
  }>;
  matiere: string;
}
interface IState {
  newMatiere: string;
  newTitreCours: string;
  modal: boolean;
}
class App extends Component<any, IState> {
  state = {
    newMatiere: "Maths",
    newTitreCours: "",
    modal: false,
  };

  handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    const newState = { [name]: value } as Pick<IState, keyof IState>;
    this.setState(newState);
  };
 modalTrue = (): void => this.setState({ modal: true });
   modalFalse = (): void =>
    this.setState({ modal: false, newMatiere: "Maths", newTitreCours: "" });

  render() {
    const { handleChange, modalTrue, modalFalse } = this;
    const { newTitreCours, newMatiere, modal } = this.state;
    const { user, setMatieresLecon, matieresLecon } = this.props;
    return (
      <SvgTemplate>
        <div className="App">
          <Navbar />
          <CreateCourse modalTrue={modalTrue} user={user} />
          {modal && (
            <ModalForm>
              <Form
                modalFalse={modalFalse}
                handleChange={handleChange}
                setMatieresState={setMatieresLecon}
                newTitreCours={newTitreCours}
                newMatiere={newMatiere}
                matieresLecon={matieresLecon}
              />
            </ModalForm>
          )}
        </div>
      </SvgTemplate>
    );
  }
}

export default App;
