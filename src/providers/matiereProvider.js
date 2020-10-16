import React, { createContext, useContext, useEffect, useState } from "react";
import { setMatiereDB } from "../utils/utils";
import { UserContext } from "./userProvider";
export const MatiereContext = createContext();
const MatiereProvider = ({ children }) => {
  const [matieresLecon, setMatieresLecon] = useState([]);
  const user = useContext(UserContext);
  useEffect(() => {
    if (user) {
      setMatiereDB(user, setMatieresLecon);
    }
  }, [user]);
  return (
    <MatiereContext.Provider value={{ matieresLecon, setMatieresLecon }}>
      {children}
    </MatiereContext.Provider>
  );
};

export default MatiereProvider;
