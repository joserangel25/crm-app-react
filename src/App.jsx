import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout'

//Pages
import Inicio from './pages/Inicio';
import EditarCliente from './pages/EditarCliente';
import NuevoCliente from './pages/NuevoCliente';
import DetalleCliente from './components/DetalleCliente';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/clientes' element={<Layout />}>
         <Route index element={<Inicio />} />
         <Route path='nuevo' element={<NuevoCliente />}/>
         <Route path='editar/:id' element={<EditarCliente />} />
         <Route path=':id' element={<DetalleCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
