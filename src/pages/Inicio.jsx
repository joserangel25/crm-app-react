import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlertaInput from '../components/AlertaInput';
import Cliente from '../components/Cliente';

const Inicio = () => {
  const [ clientes, setClientes ] = useState([]);
  const [ mensaje, setMensaje ] = useState('');

  const url = import.meta.env.VITE_URL_API;
  const location = useLocation();
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setClientes(data);
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if(location.state){
      // console.log(location.state, 'desde el if')
      if(location.state.tarea === 'editar'){
        setMensaje('Cliente editado correctamente');

        setTimeout(() => {
          setMensaje('');
        }, 1500);
      } else {
        setMensaje('Cliente creado correctamente');

        setTimeout(() => {
          setMensaje('');
        }, 1500);
      }

    }

  }, [])
  
  const scrollToTop = () => {
    document.getElementById("scroller").scroll(0,0);
  }
  

  const handleEliminar = async (id) => {
    const confir = confirm('Deseas eliminar a este cliente?');

    if(confir){
      scrollToTop()
      try {
        const res = await fetch(`${url}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        // await res.json();
        console.log(res)
        if(res.ok){
          const nuevosClientes = clientes.filter(cliente => cliente.id !== id);
          setClientes(nuevosClientes);
          setMensaje('Usuario eliminado satisfactoriamente');
          
          setTimeout(() => setMensaje(''), 1500);
        }
  
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  return (
    <div>
      <>
      <h1 className='font-black text-4xl text-blue-900'>Tus clientes</h1>
      <p className='mt-3'>Información sobre los clientes </p>
      {
        mensaje && <AlertaInput>{mensaje}</AlertaInput>
      }
      <table className='w-full mt-5 table-auto bg-white'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map(cliente => (<Cliente 
                                       key={cliente.id} 
                                       cliente={cliente} 
                                       handleEliminar={handleEliminar}/>))
          }
        </tbody>
      </table>

    </>
    </div>
  )
}

export default Inicio