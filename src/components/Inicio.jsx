import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inicio = () => {

    const [idProducto, setidProducto] = useState(null) 

    const rol = window.localStorage.getItem('Rol')

    const gestionProducto = (e)=>{
        
        e.preventDefault()
        window.localStorage.setItem('idProducto', idProducto);
        window.location.assign("/productos")
        // alert(idProducto)

    }

    const [resGet, setGet] = useState(null) 

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('Token')
            }
        }
        axios.get('http://localhost:4000/api/producto/listar', config)
        .then((response) => {

            setGet(response.data);

        })
        .catch((error) => {
            alert(error)
        })
    })

    if (resGet === null) {
        return (
            <div>
              <h1>Titulo</h1>
              <p>null</p>
            </div>
        )
    }else{

        if (rol === 'Master') {
            return resGet.map((value) =>(
                <form onSubmit={gestionProducto}>
                    <div className="container card">
                    
                        <div className="card">
                            <div className="box">
                                <div className="content">
                                    <h3>Producto: {value.nombre}</h3>
                                    <h3>Stock: {value.stock}</h3>
                                    <div className="text-center">
                                        <p><button type="submit" onClick={e=>setidProducto(value._id)} className="btn btnIngresar btn-primary">Gestionar</button></p>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </form>
            ))
        }else{
            return resGet.map((value) =>(
                <form onSubmit={gestionProducto}>
                    <div className="container card">
                    
                        <div className="card">
                            <div className="box">
                                <div className="content">
                                    <h3>Producto: {value.nombre}</h3>
                                    <h3>Stock: {value.stock}</h3>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </form>
            ))
        }

        

    }

};

export default Inicio;
