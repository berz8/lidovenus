import React, { useState, useEffect } from 'react'
import NewSubscription from '../components/modals/NewSubscription'
import Modal from '../components/Modal';

const Abbonamenti = () => {

    const [data, setData] = useState([])
    const [modalOpen, setIsOpen] = useState(false);
    const [detail, setDetail] = useState([])

    const [activeId, setActiveId] = useState(null);
    const [modalOpen2, setIsOpen2] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const openModal2 = (id = 0) => {
        setIsOpen2(true);
        setActiveId(id);
    }

    function closeModal2(){
        setIsOpen2(false);
    }

    const refresh = () => {
        getSubscrition();
        setIsOpen(false);
    }

    const showItem = id => {
        let showItems = detail.slice();
        showItems[id] = !showItems[id];
        setDetail(showItems);
    }

    const getSubscrition = async (response) => {
        response = await fetch('/api/subscription',{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(response => response.json()).
        then(dati => { setData(dati); });
    }

    useEffect(() => { getSubscrition(); }, []);

    return (
        <div>
            <NewSubscription
                isOpen={modalOpen}
                onRequestClose={closeModal}
                setModal = {setIsOpen}
                refresh = {refresh}
                />
                        <Modal
                isOpen={modalOpen2}
                onRequestClose={closeModal2}
                id={activeId}
                setModal = {setIsOpen2}
                />
            <h1>Abbonamenti</h1>
            <button onClick={() => {openModal()}} className="btn btn-primary">Nuovo Abbonamento</button>
            <div className="file">
            {Object.keys(data).map( fila => { return(
                <div key={fila} className="fila">
                {data[fila].map( posto => (
                    <div key={posto.ombrellone_row + posto.ombrellone_col} className="posto" onClick={() => { showItem(posto.id)} }>
                        <div>
                            <span className="mini-title">Ombrellone</span>
                                <h3>{posto.ombrellone_row}{posto.ombrellone_col}</h3>
                            <div className="dates">
                                <div>
                                    <span className="mini-title">Inzio</span>
                                    <span>{posto.startDate}</span>
                                </div>
                                <div>
                                    <span className="mini-title">Fine</span>
                                    <span>{posto.endDate}</span>
                                </div>
                            </div>
                        </div>
                        {detail[posto.id] && (
                            <div className="detail">
                               <div>
                                    <span className="mini-title">Password</span>
                                    <span>{posto.password}</span>
                                </div> 
                                <button onClick={() => openModal2(posto.id)} className="btn btn-primary">Elimina</button>
                            </div>
                        )}
                        
                    </div>
                ))}
                </div>
            )})} 
            </div>
        </div>
    )
}


export default Abbonamenti;