import React from 'react';
import GetBranches from './component/GetBranches';

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

const App = () => {
    
    return (
        <>
        <Router>
        <Switch>
            <Route exact path="/" component={GetBranches} />
        </Switch>

        </Router>

        </>
    );
};

export default App;
