import axios from 'axios'
import React, { useState, useEffect } from 'react';

export default function GestionProductos() {

    const [nombre, setNombre] = useState('')
    const [stock, setStock] = useState('')  
    const [valGestion, setValGestion] = useState('') 

    const idProduct = window.localStorage.getItem('idProducto')

    let config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('Token')
        }
    }


    const registrar = (e)=>{
        e.preventDefault()
        const nuevoProducto = {nombre, stock}
        axios.post('http://localhost:4000/api/producto/', nuevoProducto, config)
            .then(respuesta => {
                if (respuesta.status === 200 && respuesta.data) {
                    alert("Producto creado con exito")
                    window.location.assign("/inicio")
                }
            })
            .catch(error => {
                alert(error)
                console.log(error);
            })
    }

    const gestionar = (e)=>{
        e.preventDefault()
        const productoGestionado = {nombre, stock}
        const url = "http://localhost:4000/api/producto/"+idProduct

        if (valGestion === 1) {
            //editar
            axios.put(url, productoGestionado, config)
                .then(respuesta => {
                    alert("Producto editado con exito")
                    window.location.assign("/inicio")
                })
                .catch(error => {
                    alert(error)
                    console.log(error);
                })
            
        }else if(valGestion === 2){
            //eliminar
            axios.delete(url, config)
                .then(respuesta => {
                    alert("Producto eliminado con exito")
                    window.location.assign("/inicio")
                })
                .catch(error => {
                    alert(error)
                    console.log(error);
                })
        }

    }

    const [resGet, setGet] = useState(null) 
    useEffect(() => {
        const urlFind = "http://localhost:4000/api/producto/"+idProduct
        axios.get(urlFind, config)
        .then((response) => {

            setGet(response.data);

        })
        .catch((error) => {
            alert(error)
        })
    })

    if (idProduct && resGet) {

        return (
            <div className='container cajaLogin col-md-4'>
                <form onSubmit={gestionar}>
                    <div className='container login py-3 h-100 text-dark border border-primary rounded'>
                            <h3 className='text-center'>Gestión del Producto</h3><br></br>
                            <div className="mb-3">
                                <input type="text" className="form-control" defaultValue={resGet.nombre} onChange={e=>setNombre(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control" defaultValue={resGet.stock} onChange={e=>setStock(e.target.value)}/>
                            </div>
                            <div className="text-center">
                                <p><button type="submit" onClick={e=>setValGestion(1)} className="btn btnIngresar bg-success btn-primary">Editar</button></p>
                                <p><button type="submit" onClick={e=>setValGestion(2)} className="btn btnIngresar bg-danger btn-primary">Eliminar</button></p>
                            </div>
                            <h6><a href="/inicio">Lista</a></h6>
                    </div>
                </form>
            </div>
        )
    }else{
        return (
            <div className='container cajaLogin col-md-4'>
                <form onSubmit={registrar}>
                    <div className='container login py-3 h-100 text-dark border border-primary rounded'>
                            <h3 className='text-center'>Crear Producto</h3><br></br>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder='Nombre' required onChange={e=>setNombre(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control" placeholder='Stock' required onChange={e=>setStock(e.target.value)}/>
                            </div>
                            <div className="text-center">
                                <p><button type="submit" className="btn btnIngresar btn-primary">Crear</button></p>
                            </div>
                            <h6><a href="/inicio">Lista</a></h6>
                    </div>
                </form>
            </div>
        )
    }

    

}
