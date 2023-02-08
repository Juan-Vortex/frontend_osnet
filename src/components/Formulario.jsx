import axios from 'axios'
import React, { useState } from 'react'

export default function Formulario() {

    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')  
    const [contrasena, setContrasena] = useState('')  
    const [rol, setRol] = useState('')  

    const registrar = (e)=>{
        e.preventDefault()
        const nuevoUsuario = {nombre, correo, contrasena, rol}
        let config = {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('Token')
            }
        }
        axios.post('http://localhost:4000/api/usuario/', nuevoUsuario)
            .then(respuesta => {
                if (respuesta.status === 200 && respuesta.data) {
                    alert("Usuario creado con exito")
                    window.location.assign("/")
                }
            })
            .catch(error => {
                alert(error)
                console.log(error);
            })
    }

  return (
    <div className='container cajaLogin col-md-4'>
        <form onSubmit={registrar}>
            <div className='container login py-3 h-100 text-dark border border-primary rounded'>
                    <h3 className='text-center'>Creación de Usuario</h3><br></br>
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
                    <h6><a href="../">Regresar</a></h6>
            </div>
        </form>
    </div>
  )
}
