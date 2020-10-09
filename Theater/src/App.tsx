//Import all tabs 
import * as React from 'react';
import { SignUp } from './components/Sign-Up/SignUp';

import { Dashboard } from './components/Dashboard/Dashboard';
import { AddMovie } from './components/Add-Movies/AddMovie';


import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';



export const App: React.FunctionComponent = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={SignUp} />
                <Route path="/SignUp" component={SignUp} />
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/AddMovie" component={AddMovie} />
            </Switch>
        </Router>
    );
};



export default App