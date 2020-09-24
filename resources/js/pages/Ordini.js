import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LastOrders from '../components/LastOrders'


const Ordini = () => {

    

    return (
        <div>
            <h1>Ordini</h1>
            <div className="row">
            <div className="col-lg-6">
                       <h3>Ordini da evadere</h3>
                    <LastOrders tipo='pending' />
                </div>
                <div className="col-lg-6">
                <div className="title-split">
                       <h3>Ordini evasi</h3>
                       <Link to="/ordini/storico" className="btn btn-primary">Storico Ordini</Link>
                    </div>
                    <LastOrders tipo='done' />
                </div>
            </div>
        </div>
    )
}


export default Ordini;