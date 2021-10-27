import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
  } from "react-router-dom";
  import Presale from '../pages/presale';
  import PresaleQR from '../pages/presaleQR';

  function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Presale} />
                <Route exact path="/Buy" component={PresaleQR} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
