import React from 'react'

export default function Header() {

  const btnSalir = (e)=>{
    e.preventDefault()
    window.localStorage.clear();
    window.location.assign("/")
  }

  const rol = window.localStorage.getItem('Rol')

  const btnUsuarios = (e)=>{
    e.preventDefault()
    window.localStorage.removeItem('idUsuario');
    window.location.assign("/usuarios")
  }

  const btnProductos = (e)=>{
    e.preventDefault()
    window.localStorage.removeItem('idProducto');
    window.location.assign("/productos")
  }

  let token = window.localStorage.getItem('Token');
  if (rol === 'Master') {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  
                      <h1 className="navbar-brand navTitle">Supermarket</h1>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
    
                              <li className="nav-item">
                                  <a onClick={btnProductos} className="nav-link" href="/productos">Productos</a>
                              </li>
                              <li className="nav-item">
                                  <a onClick={btnUsuarios} className="nav-link" href="/usuarios">Usuarios</a>
                              </li>
                              <li className="nav-item navBody">
                                    <h6><a onClick={btnSalir} className="nav-link" href="/">Salir</a></h6>
                              </li>
    
                            </ul>
                        </div>

      </nav>
    )
  }else{
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  
                      <h1 className="navbar-brand navTitle">Supermarket</h1>
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto mb-4">
    
                              <li className="nav-item navBody">
                                    <h6><a onClick={btnSalir} className="nav-link" href="/">Salir</a></h6>
                              </li>
    
                            </ul>
                        </div>
      </nav>
    )
  }

  
}
