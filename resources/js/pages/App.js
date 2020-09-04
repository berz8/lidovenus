import React from 'react';
import {
    Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import history from '../components/history';
import Dashboard from './Dashboard';
import Gestione from './Gestione';
import Ordini from './Ordini';


const App = () => {
    return (
        <div>
           <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/gestione" component={Gestione} />
                    <Route path="/ordini" component={Ordini} />
                    {/* <Route exact path="/actors" component={ActorsMain} />
                    <Route path="/actors/:id" component={Actors} />
                    <Route path="/directors/:id" component={Directors} />
                    <Route exact path="/directors" component={DirectorsMain} />
                    <Route path="/search" component={Search} />
                    <Route component={NoMatch} /> */}
                </Switch>
            </Router>
        </div>
    );
}

export default App;



