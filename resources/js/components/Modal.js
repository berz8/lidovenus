import React, { useState, useEffect } from 'react';
import {
    Link
  } from "react-router-dom";



const Modal = props => {

    const elimina =  async (response) => {
        let url = '/api/' + props.type + '/' + props.id;
        response = await fetch(url,{
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(response => response.json()).
        then(dati => {
            props.setModal(false)
            props.refresh();
        });
    }


    if(props.isOpen == true){
        return (
            <div className="modal text-center">
                <button className="close" onClick={() => props.setModal(false)}>X</button>
                <h3>Sei sicuro di voler eliminare?</h3>
                <div>
                    <button className="btn btn-primary" onClick={() => elimina()}>Elimina</button>
                    <button className="btn btn-secondary" onClick={() => props.setModal(false)}>Chiudi</button>
                </div>
                {/* {props.id} */}
            </div>
        )}
        else {
            return null
        }
}


export default Modal;