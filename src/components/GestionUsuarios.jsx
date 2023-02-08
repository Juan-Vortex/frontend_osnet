import axios from 'axios'
import React, { useState, useEffect } from 'react';

export default function GestionUsuarios() {

    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')  
    const [contrasena, setContrasena] = useState('')  
    const [rol, setRol] = useState('') 
    const [valGestion, setValGestion] = useState('')  

    const idUser = window.localStorage.getItem('idUsuario')

    let config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('Token')
        }
    }

    const registrar = (e)=>{
        e.preventDefault()
        const nuevoEmpleado = {nombre, correo, contrasena, rol}
        axios.post('http://localhost:4000/api/usuario/', nuevoEmpleado)
            .then(respuesta => {
                if (respuesta.status === 200 && respuesta.data) {
                    alert("Usuario creado con exito")
                    window.location.assign("/lista")
                }
            })
            .catch(error => {
                alert(error)
                console.log(error);
            })
    }

    const gestionar = (e)=>{
        e.preventDefault()
        const usuarioGestionado = {nombre, correo, contrasena}
        const url = "http://localhost:4000/api/usuario/"+idUser

        if (valGestion === 1) {
            //editar
            if (nombre !== "" && correo !== "" && contrasena !== "") {
                axios.put(url, usuarioGestionado, config)
                    .then(respuesta => {
                        alert("Usuario editado con exito")
                        window.location.assign("/lista")
                    })
                    .catch(error => {
                        alert(error)
                        console.log(error);
                    })
            }else{
                alert('Los datos cargados por default no serán tenidos en cuenta, actualice todas las cajas.')
            }
        }else if(valGestion === 2){
            //eliminar
            axios.delete(url, config)
                .then(respuesta => {
                    alert("Usuario eliminado con exito")
                    window.location.assign("/lista")
                })
                .catch(error => {
                    alert(error)
                    console.log(error);
                })
        } 
        
    }
    
    const [resGet, setGet] = useState(null) 
    useEffect(() => {
        const urlFind = "http://localhost:4000/api/usuario/"+idUser
        axios.get(urlFind, config)
        .then((response) => {

            setGet(response.data);

        })
        .catch((error) => {
            alert(error)
        })
    })

    if (idUser && resGet) {

        return (
            <div className='container cajaLogin col-md-4'>
                <form onSubmit={gestionar}>
                    <div className='container login py-3 h-100 text-dark border border-primary rounded'>
                            <h3 className='text-center'>Gestión de Usuarios</h3><br></br>
                            <div className="mb-3">
                                <input type="text" className="form-control" defaultValue={resGet.nombre} onChange={e=>setNombre(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" defaultValue={resGet.correo} onChange={e=>setCorreo(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" defaultValue={resGet.contrasena} onChange={e=>setContrasena(e.target.value)}/>
                            </div>
                          
                            <div className="text-center">
                                <p><button type="submit" onClick={e=>setValGestion(1)} className="btn btnIngresar bg-success btn-primary">Editar</button></p>
                                <p><button type="submit" onClick={e=>setValGestion(2)} className="btn btnIngresar bg-danger btn-primary">Eliminar</button></p>
                            </div>
                            <h6><a href="/lista">Lista</a></h6>
                    </div>
                </form>
            </div>
        )   
    }else{
        return (
            <div className='container cajaLogin col-md-4'>
                <form onSubmit={registrar}>
                    <div className='container login py-3 h-100 text-dark border border-primary rounded'>
                            <h3 className='text-center'>Registro Usuarios</h3><br></br>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder='Nombre' required onChange={e=>setNombre(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder='Correo electronico' required onChange={e=>setCorreo(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder='Contraseña' required onChange={e=>setContrasena(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="radio" className='m-2'  id="age1" name="age" onChange={e=>setRol('Master')}></input> Master 
                                <input className='m-2'  type="radio" id="age1" name="age" onChange={e=>setRol('Read')}></input> Read
                            </div>
                            <div className="text-center">
                                <p><button type="submit" className="btn btnIngresar btn-primary">Registrar</button></p>
                            </div>
                            <h6><a href="/lista">Lista</a></h6>
                    </div>
                </form>
            </div>
        )
    }
        
}
