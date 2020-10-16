import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Chargment from "./components/Chargment";
//Pages
import Comp from "./pages/Comp";
import Editor from "./pages/Editor";
import Matieres from "./pages/Matieres";
import NotFound from "./pages/NotFound";
//Context
import UserProvider from "./providers/userProvider";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MatiereProvider from "./providers/matiereProvider";

ReactDOM.render(
  <UserProvider>
    <MatiereProvider>
      <Suspense fallback={Chargment}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Comp} />
            <Route exact path="/:uid/:titleMatiere/:titleCourse/" component={Editor} />
            <Route exact path="/matieres" component={Matieres} />
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </MatiereProvider>
  </UserProvider>,
  document.getElementById("root")
);
