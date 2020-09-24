import React, { useState, useEffect } from 'react'




const NewSubscription = props => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let data = JSON.stringify({
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        })
        fetch('/api/register',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
            },
            body: data
        }).then(response => response.json()).
        then(data => {
            setName('')
            setEmail('')
            setPassword('')
            setPasswordConf('')
            props.refresh()
            props.setModal(false)

        });
    }


    if(props.isOpen == true){
        return (
            <div className="modal newuser">
                <h3>Nuovo Utente</h3>
                <button className="close" onClick={() => props.setModal(false)}>X</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Conferma Password</label>
                        <input type="password" className="form-control" placeholder="Conferma Password" value={passwordConf} onChange={e => setPasswordConf(e.target.value)}/>
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