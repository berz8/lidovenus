import React, { useState, useEffect } from 'react'

const TotMoney = () => {

    const [ data, setData] = useState([])

    const getMoney = async (response) => {
        response = await fetch('/api/money-count',{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(response => response.json()).
        then(dati => {
            setData(dati);
        });
    }

    useEffect(() => { getMoney(); }, []);


    return(
        <div className="cards">
            <h2>Totale incassi</h2>
            <div>
                <div>
                    <span>Oggi</span>
                    <h2>€{data.today}</h2>
                </div>
                <div>
                    <span>Ultimi 7 giorni</span>
                    <h2>€{data.week}</h2>
                </div>
            </div>
        </div>
    )
}

export default TotMoney