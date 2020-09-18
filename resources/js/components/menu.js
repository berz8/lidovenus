import React from 'react';
import {
    Link
  } from "react-router-dom";



const Menu = () => {
    return (
        <div className="navigation-menu">
            <h5>Menu</h5>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/gestione">Gestione</Link>
                </li>
                <li>
                    <Link to="/ordini">Ordini</Link>
                </li>
                <li>
                    <Link to="/ombrelloni">Ombrelloni</Link>
                </li>
            </ul>
        </div>
    )
}


export default Menu;