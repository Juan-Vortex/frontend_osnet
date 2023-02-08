import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Lista = () => {

    const [idUsuario, setidUsuario] = useState(null) 

    const gestionUsuario = (e)=>{
        
        e.preventDefault()
        window.localStorage.setItem('idUsuario', idUsuario);
        window.location.assign("/usuarios")

    }

    const [resGet, setGet] = useState(null) 

    useEffect(() => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('Token')
            }
        }
        axios.get('http://localhost:4000/api/usuario/listar', config)
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

        return resGet.map((value) =>(

            <form onSubmit={gestionUsuario}>
                <div className="container card">
                
                    <div className="card">
                        <div className="box">
                            <div className="content">
                                <p>Nombre: {value.nombre}</p>
                                <p>Correo: {value.correo}</p>
                                <p>Rol: {value.rol}</p>
                                <div className="text-center">
                                    <p><button type="submit" onClick={e=>setidUsuario(value._id)} className="btn btnIngresar btn-primary">Gestionar</button></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form>

            
        ))

    }

};

export default Lista;
