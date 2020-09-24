import React, { useState, useEffect } from 'react'
import Modal from './Modal';


const LastOrders = (props) => {

    const [data, setData] = useState([])
    const [detail, setDetail] = useState([])
    const [activeId, setActiveId] = useState(null)
    const [modalOpen, setIsOpen] = useState(false)

    const openModal = (id = 0) => {
        setIsOpen(true);
        setActiveId(id);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const getOrder = async (response) => {
        response = await fetch('/api/' + props.tipo,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(response => response.json()).
        then(dati => { 
            setData(dati);
            setTimeout(getOrder, 5000) });
    }

    useEffect(() => { getOrder() }, []);

    const showItem = id => {
        let showItems = detail.slice();
        showItems[id] = !showItems[id];
        setDetail(showItems);
    }

    const evadi = async (id, response) => {
            response = await fetch('/api/evadi-ordine/' + id,{
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(response => response.json()).
            then(dati => { getOrder() });
        }

    return (
        <div className="last-orders">
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                id={activeId}
                setModal = {setIsOpen}
                type="order"
                refresh={getOrder}
                />
            {data.map(value => {
                let products = JSON.parse(value.products).map( product => {
                    return(
                    <li key={product.id}>
                        <span>{product.name} </span>
                        <span>{product.quantita} </span>
                        <span>€{product.price}</span>
                    </li>)
                })
                return(
                    <div className="order-list" key={value.id} onClick={() => { showItem(value.id) }}>
                        <div>
                            <h4><span>Ombrellone</span>{value.ombrellone}</h4>
                            <h4><span>Totale</span>{value.total}</h4>
                        </div>
                        {detail[value.id] && (
                            <>
                            <ul>
                            <li className='li-title'>
                                <span>Prodotto</span>
                                <span>Quantità</span>
                                <span>Prezzo</span>
                            </li>
                                {products}
                            </ul>
                            <div>
                                {props.tipo != 'done' && (
                                    <button className="btn btn-primary" onClick={() => evadi(value.id)} >Segna come evaso</button>
                                )}
                                <button className="btn btn-primary" onClick={() => openModal(value.id)} >Cancella</button>
                            </div>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}


export default LastOrders;