import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Chargment from "./components/Chargment";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Pages
import Comp from "./pages/Comp";
import CompEditor from "./pages/CompEditor";
import Matieres from "./pages/Matieres";
import NotFound from "./pages/NotFound";
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
              <Route exact path="/leçon" component={CompEditor} />
              <Route exact path="/matieres" component={Matieres} />
              <Route component={NotFound}/>
            </Switch>
          </BrowserRouter>
        </Suspense>
      </CurrentLeçonProvider>
    </MatiereProvider>
  </UserProvider>,
  document.getElementById("root")
);
