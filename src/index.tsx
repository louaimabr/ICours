import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Chargment from "./components/Chargment";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Pages
import Comp from "./pages/Comp";
import Editor from "./pages/Editor.jsx";
import Matieres from "./pages/Matieres";
import NotFound from "./pages/NotFound";
// import CompFriends from "./pages/CompFriends";
//Context
import UserProvider from "./providers/userProvider";
import MatiereProvider from "./providers/matiereProvider";
import CurrentLeçonProvider from "./providers/currentLeçonProvider"

ReactDOM.render(
  <UserProvider>
    <MatiereProvider>
      <CurrentLeçonProvider>
        <Suspense fallback={Chargment}>
          <BrowserRouter>
            <Switch> 
              <Route exact path="/" component={Comp} />
              <Route exact path="/leçon" component={Editor} />
              <Route exact path="/matieres" component={Matieres} />
              {/* <Route exact path="/amis" component={CompFriends} /> */}
              <Route component={NotFound}/>
            </Switch>
          </BrowserRouter>
        </Suspense>
      </CurrentLeçonProvider>
    </MatiereProvider>
  </UserProvider>,
  document.getElementById("root")
);
