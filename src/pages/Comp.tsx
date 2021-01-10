import React, { useContext, FC } from "react";
import App from "../components/App";
import { UserContext } from "../providers/userProvider";
import { MatiereContext } from "../providers/matiereProvider";

//Components
import HomeDisconnect from "../components/Disconnected/HomeDisconnect";

export interface USER {
  uid: string;
  photoURL: string;
  displayName: string;
  email: string;
  createdAt: string;
  friends : Array<any>
  friendsReq : Array<any>
}
const Comp: FC = () => {
  const user: USER = useContext(UserContext);
  const { matieresLecon, setMatieresLecon } = useContext(MatiereContext);
  if (user) {
    return (
      <App
        user={user}
        matieresLecon={matieresLecon}
        setMatieresLecon={setMatieresLecon}
      />
    );
  } else {
    return <HomeDisconnect />;
  }
};

export default Comp;
