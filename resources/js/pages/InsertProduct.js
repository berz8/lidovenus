import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useParams } from 'react-router-dom'
import Dropzone from 'react-dropzone'


const InsertProduct = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [description, setDescription] = useState("")
    const [category_id, setCategory_id] = useState(0)
    const [image, setImage] = useState('')
    const [status, setStatus] = useState(false)
    let metodo = 'POST'
    let url = '/api/product'
    const [options, setOptions] = useState([])
    let { id } = useParams()

    const getCategory = () => {
            fetch('/api/category',{
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(response => response.json()).
            then(data => {
                data.map( categoria => {
                    let _options = options
                    _options.push({
                        value: categoria.id, label: categoria.name
                    })
                    setOptions(_options)
                } )
            });
    }

    const edit = () => {
        if(id){
            fetch('/api/product/' + id,{
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(response => response.json()).
            then(data => {
                setName(data[0].name)
                setPrice(data[0].price)
                setStock(data[0].stock)
                setDescription(data[0].description)
                setCategory_id(data[0].category_id)
                setImage(data[0].image)
            });
        }
    }

    const handleSubmit = (evt) => {
        if(id) {metodo = 'PUT'; url = url+'/'+id} else {metodo = 'POST'}
        evt.preventDefault();
        let data = JSON.stringify({
            name: name,
            price: price,
            stock: stock,
            description: description,
            category_id: category_id,
            image: image
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

    const uploadFile = (image) => {
        console.log(image);
        let fd = new FormData;
        fd.append('file', image[0])
        fd.append("upload_preset", "ml_default")
        fetch('https://api.cloudinary.com/v1_1/doaalc9rs/upload',{
            method: 'POST',
/*             headers: {
                'Content-Type' : 'application/json',
            }, */
            body: fd
        }).then(response => response.json()).
        then(dati => { setImage(dati.secure_url) })
    }

    useEffect(() => { edit(); getCategory() }, []);

    return (
        <div>
            { id ?  <h1>Modifica Prodotto</h1> : <h1>Nuovo Prodotto</h1> }
            { status && (<div class="alert alert-success" role="alert">
                Prodotto aggiornato con successo
                </div>) }
            <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-lg-7">
                        <div className="form-group">
                            <label>Nome</label>
                            <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Prezzo</label>
                            <input className="form-control" type="number" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Disponibilità</label>
                            <input className="form-control" type="text" value={stock} onChange={e => setStock(e.target.value)} />
                        </div>
{/*                         <div className="form-group">
                            <label>Immagine</label>
                            <input className="form-control" type="file"  onChange={e => setImage(e.target.files[0])} />
                        </div> */}
                        <div className="form-group">
                            <label>Descrizione</label>
                            <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <Select  options={options} onChange={e => setCategory_id(e.value)} />
                        </div>
                        <input className="btn btn-primary" type="submit" value={ id ?  'Aggiorna' : 'Inserisci' } />
                </div>
                <div className="col-lg-5 product-image">
                    <Dropzone onDrop={acceptedFiles => uploadFile(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Rilascia qui la tua immagine, oppure clicca per selezionare</p>
                            { (image != '') && (
                                <img className="product-image" src={image} />
                            ) }
                        </div>
                        </section>
                    )}
                    </Dropzone>
                </div>
            </div>
            </form>
        </div>
    )
}



export default InsertProduct;