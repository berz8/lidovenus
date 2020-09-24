import React, { useState, useEffect } from 'react'
import {
    Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom"

import history from '../components/history'
import Dashboard from './Dashboard'
import Gestione from './Gestione'
import Ordini from './Ordini'
import Menu from '../components/menu'
import InsertProduct from './InsertProduct'
import GestioneProdotti from './GestioneProdotti'
import GestioneCategorie from './GestioneCategorie'
import Abbonamenti from './Abbonamenti'
import Login from './Login'
import { UserContext } from '../components/UserContext'
import InsertCategory from './InsertCategory'
import StoricoOrdini from './StoricoOrdini'
import Logout from './Logout'
import Users from './Users'


const App = () => {

    const [isLogged, setIsLogged] = useState('false');
    const [toggleCheck, setToggleCheck] = useState(false);

    const logincheck = () => {
        if(sessionStorage.getItem("token") === null){
            setIsLogged('false');
        } else {
            setIsLogged('true');
        }
    }
    useEffect(() => { logincheck() })

    return (
        <div>
           <Router history={history}>
           {(isLogged == 'true') ? (
               <>
                <Menu />
                <div className="container-fluid main">
                    <Switch>
                        <UserContext.Provider value={{ toggleCheck, setToggleCheck }}>
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/gestione" component={Gestione} />
                                <Route exact path="/gestione/prodotti" component={GestioneProdotti} />
                                <Route exact path="/gestione/prodotti/nuovo" component={InsertProduct} />
                                <Route exact path="/gestione/prodotto/:id" component={InsertProduct} />
                                <Route exact path="/gestione/categorie" component={GestioneCategorie} />
                                <Route exact path="/gestione/categorie/nuova" component={InsertCategory} />
                                <Route exact path="/gestione/categoria/:id" component={InsertCategory} />
                            <Route exact path="/ordini" component={Ordini} />
                            <Route exact path="/ordini/storico" component={StoricoOrdini} />
                            <Route path="/abbonamenti" component={Abbonamenti} />
                            <Route exact path="/users" component={Users} />
                            <Route exact path="/logout" component={Logout} />
                            {/* <Redirect from='/login' to="/" /> */}
                        </UserContext.Provider>
                    </Switch>
                </div>
                </> ) : (
                    <div className="container-fluid main">
                    <Switch>
                        <UserContext.Provider value={{ toggleCheck, setToggleCheck }}>
                            <Route path="*" component={Login} />
                        </UserContext.Provider>
                    </Switch>
                    </div>
                )}
            </Router>
        </div>
    );
}

export default App;



