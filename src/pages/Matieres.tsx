import React, { FC, useContext, useState } from "react";
import { MatiereContext } from "../providers/matiereProvider";
import { UserContext } from "../providers/userProvider";
import { MATIERE__STATE } from "../components/App";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
//Components
import ListeMatieres from "../components/ListeMatieres";
import NavbarConnect from "../components/Navbar";
import SvgTemplate from "../components/SvgTemplate";
interface MATIERE__CONTEXT {
  matieresLecon: Array<MATIERE__STATE>;
  setMatieresLecon: (arr: Array<MATIERE__STATE>) => void;
}
type SEARCH__ARR={
    Lecon: string,
    to: {
      pathname: string,
      state: {
        cours: {
          title: string,
          content:string,
          matiere: string,
          createdAt: string,
        },
        user,
      },
    },
}
const Matieres: FC = () => {
  const user = useContext(UserContext);
  const [searchArr, setSearchArr] = useState<Array<SEARCH__ARR>>([]);
  const [search, setSearch] = useState("");
  const { matieresLecon }: MATIERE__CONTEXT = useContext(MatiereContext);
  
  if (!user) return <Redirect to="/" />;
  const handleChange = (e) => {
    setSearchArr([]);
    const currentValue = e.target.value;
    setSearch(currentValue);
    const matieresLeconSplice = [...matieresLecon];
    const searchArrSplice: any = [];

    matieresLeconSplice.map((m) => {
      const [currentLecon] = m.leçon;
      if (
        currentLecon &&
        currentLecon.titre.toLowerCase().includes(currentValue.toLowerCase()) &&
        currentValue !== ""
      ) {
        searchArrSplice.push({
          Lecon: `${m.matiere}-${currentLecon.titre.toUpperCase()}`,
          to: {
            pathname: `${user.uid}/${currentLecon.matiere}/${currentLecon.titre}`,
            state: {
              cours: {
                title: currentLecon.titre,
                content: currentLecon.content,
                matiere: currentLecon.matiere,
                createdAt: currentLecon.createdAt,
              },
              user,
            },
          },
        });
      }
      return null;
    });
    setSearchArr(searchArrSplice);
  };
  return (
    <SvgTemplate>
      <div className="Matieres">
        <NavbarConnect />
        <div className="research">
          <div>
            <input
              type="text"
              placeholder="Rechercher une leçon"
              onChange={handleChange}
              value={search}
            />
            <div><img src={require('../img/loupe.png')} alt="Loupe"/></div>
          </div>
          <div className="researchResult" style={{ display: search !== "" ? "block" : "none" }}>
            {searchArr.map((l) => (
              <Link key={l.Lecon} to={l.to}>
                <p>{l.Lecon}</p>
                <hr/>
              </Link>
            ))}
          </div>
        </div>
        <div className="ListMatiere">
          {matieresLecon.length !== 0 ? (
            matieresLecon.map((m: MATIERE__STATE) => {
              if(m.leçon.length !==0){
                return (
                  <ListeMatieres key={m.matiere} matiereLecon={m} user={user} />
                );
              }
            })
          ) : (
            <h2 className="errorLeçon">
              Vous n'avez pour l'instant enregistrez aucune leçon
            </h2>
          )}
        </div>
      </div>
    </SvgTemplate>
  );
};

export default Matieres;
