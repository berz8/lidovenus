import React from 'react';
import { Link } from 'react-router-dom'
import Categorie from './GestioneCategorie';
import Prodotti from './GestioneProdotti';


const Gestione = () => {
    return (
        <div>
            <h1>Gestione</h1>
            <div className="row">
                <div className="col-lg-7">
                    <div className="title-split">
                       <h3>Prodotti</h3>
                       <div>
                       <Link to="/gestione/prodotti/nuovo" className='btn btn-primary btn-add'>
                            <svg  viewBox="0 0 448 448"  xmlns="http://www.w3.org/2000/svg">
                                <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                            </svg>
                        </Link>
                        <Link to="/gestione/prodotti" className="btn btn-primary">Vedi tutti</Link>
                       </div>
                    </div>
                    <Prodotti is_page={true}/>
                </div>
                <div className="offset-lg-1 col-lg-4">
                    <div className="title-split">
                       <h3>Categorie</h3>
                       <div>
                       <Link to="/gestione/categorie/nuova" className='btn btn-primary btn-add'>
                            <svg  viewBox="0 0 448 448"  xmlns="http://www.w3.org/2000/svg">
                                <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                            </svg>
                        </Link>
                        <Link to="/gestione/categorie" className="btn btn-primary">Vedi tutte</Link>
                       </div>
                    </div>
                    <Categorie is_page={true} />
                </div>
                
            </div>
        </div>
    )
}


export default Gestione;