import React from 'react';
import TotMoney from '../components/cards/TotMoney'
import TotOrder from '../components/cards/TotOrder';
import TotProduct from '../components/cards/TotProduct';
import LastOrders from '../components/LastOrders'

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <div className="row">
                <div className="col-lg-6">
                    <TotMoney />
                    <TotProduct />
                    <TotOrder />
                </div>
                <div className="col-lg-6">
                    <h2>Ultimi ordini</h2>
                    <LastOrders tipo='pending' />
                </div>
            </div>
        </div>
    )
}


export default Dashboard;