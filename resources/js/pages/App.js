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
import Menu from '../components/menu';


const App = () => {
    return (
        <div>
           <Router history={history}>
                <Menu />
                <div className="container-fluid main">
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
                </div>
                
            </Router>
        </div>
    );
}

export default App;



