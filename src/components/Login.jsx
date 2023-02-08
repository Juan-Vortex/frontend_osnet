import axios from 'axios'
import React, { useState } from 'react'

export default function Login() {

    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('') 
    
    window.localStorage.clear();

    const login = (e)=>{
        e.preventDefault()
        const dataReq = {correo, contrasena}
        axios.post('http://localhost:4000/api/usuario/login', dataReq)
            .then(respuesta => {
                console.log(respuesta.data);
                if (respuesta.data.token) {
                    window.localStorage.setItem('Token', respuesta.data.token);
                    window.localStorage.setItem('Rol', respuesta.data.rol);
                    window.location.assign("/inicio")
                }else{
                    const msgErr = respuesta.data.message
                    alert(msgErr)
                }
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <div className='container cajaLogin col-md-4'>
            <form onSubmit={login}>
                <div className='container login py-3 h-100 text-dark border border-primary rounded'>
                    <h3 className='text-center'>Login Supermarket</h3><br></br>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder='Correo electronico' required onChange={e=>setCorreo(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder='Contraseña' required onChange={e=>setContrasena(e.target.value)}/>
                    </div>
                    <div className="text-center">
                        <p><button type="submit" className="btn btnIngresar btn-primary">Ingresar</button></p>
                        <h6><a href="/registro">Registrarme</a></h6>
                    </div>
                </div>
            </form>
        </div>
    )
 
}
