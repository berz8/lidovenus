import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const InsertCategory = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false)

    let metodo = 'POST'
    let url = '/api/category'
    let { id } = useParams()

    const edit = () => {
        if(id){
            fetch('/api/category/' + id,{
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(response => response.json()).
            then(data => {
                setName(data.name)
                setDescription(data.description)
            });
        }
    }

    const handleSubmit = (evt) => {
        if(id) {metodo = 'PUT'; url = url+'/'+id} else {metodo = 'POST'}
        evt.preventDefault();
        let data = JSON.stringify({
            name: name,
            description: description,
        })
        fetch(url,{
            method: metodo,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
            },
            body: data
        }).then(response => response.json()).
        then((data) => {
            setStatus(true)
        });
    }

    useEffect(() => { edit() }, []);

    return (
        <div>
            { id ?  <h1>Modifica Categoria</h1> : <h1>Nuovo Categoria</h1> }
            { status && (<div class="alert alert-success" role="alert">
                Categoria aggiornata con successo
                </div>) }
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nome</label>
                            <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Descrizione</label>
                            <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <input className="btn btn-primary" type="submit" value={ id ?  'Aggiorna' : 'Inserisci' } />
                    </form>
                </div>
            </div>
        </div>
    )
}



export default InsertCategory;