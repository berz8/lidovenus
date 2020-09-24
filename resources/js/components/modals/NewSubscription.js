import React, { useState, useEffect } from 'react'




const NewSubscription = props => {

    const [ombrellone_row, setOrow] = useState('')
    const [ombrellone_col, setOcol] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let data = JSON.stringify({
            ombrellone_row: ombrellone_row,
            ombrellone_col: ombrellone_col,
            startDate: startDate,
            endDate: endDate,
        })
        fetch('/api/subscription',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
            },
            body: data
        }).then(response => response.json()).
        then(data => {
            props.refresh()
            setOcol('')
            setOrow('')
        });
    }


    if(props.isOpen == true){
        return (
            <div className="modal">
                <h3>Nuovo Abbonamento</h3>
                <button className="close" onClick={() => props.setModal(false)}>X</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Fila" value={ombrellone_row} onChange={e => setOrow(e.target.value)} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Posto" value={ombrellone_col} onChange={e => setOcol(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <label>Data inizio</label>
                            <input type="date" className="form-control" placeholder="Fila" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                        </div>
                        <div className="col">
                            <label>Data inizio</label>
                            <input type="date" className="form-control" placeholder="Posto" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                        </div>
                    </div>
                        <input className="btn btn-primary" type="submit" value="Inserisci" />
                    </form>
            </div>
        )}
        else {
            return null
        }
}


export default NewSubscription;