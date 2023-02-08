import React from 'react'
import { 
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
 } from "react-router-dom";
import Login from "./Login";
import Formulario from "./Formulario";
import GestionProductos from "./GestionProductos";
import GestionUsuarios from "./GestionUsuarios";
import Inicio from "./Inicio";
import Lista from "./Lista";

export default function Body() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/registro",
      element: <Formulario />
    },
    {
      path: "/inicio",
      element: <Inicio />
    },
    {
      path: "/productos",
      element: <GestionProductos />
    },
    {
      path: "/usuarios",
      element: <GestionUsuarios />
    },
    {
      path: "/lista",
      element: <Lista />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )

}
