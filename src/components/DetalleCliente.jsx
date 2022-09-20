import { setNestedObjectValues } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'
import AlertaInput from './AlertaInput';
import Spinner from './Spinner';

const DetalleCliente = () => {
  const { state } = useLocation();
  const { id } = useParams();
  // console.log(state)
  // const { email, empresa, nombre, telefono, notas } = state.cliente;

  const [ cliente, setCliente ] = useState({});
  const [ cargando, setCargando ] = useState(true);

  useEffect(() => {
    // setCargando(true)
    if(state){
      setCliente(state.cliente)
      setCargando(false)
    } else {     
      const getClienteById = async () => {
        const res = await fetch(`${import.meta.env.VITE_URL_API}/${id}`);
        console.log(res)
        if(res.ok){
          const infoCLiente = await res.json();
          // console.log(infoCLiente)
          setCliente(infoCLiente);
          setCargando(false)

        }else {
          console.log('else')
          setCliente({error: `Error ${res.status} : ${res.statusText}`});
          setCargando(false)

        }
      }
      getClienteById();
    }
  }, [])
  
  
  return (
    <>
    
    {
      (cargando) ? <Spinner />
      :
      cliente.error ? <AlertaInput error={true}>{cliente.error}</AlertaInput>
      : 
      <>
          <Link className='font-bold text-blue-900 underline cursor-pointer' to='/clientes'> 
            {`<-`} Volver
          </Link>
          <h1 className='font-black text-4xl text-blue-900'>Información de {cliente.nombre.toUpperCase()}</h1>
          <p className='mt-3'>Este es el detalle </p>

          <div className='text-xl mt-10'>
            <p><span className='font-bold text-gray-800'>Nombre: </span>{ cliente.nombre }</p>
            <p><span className='font-bold text-gray-800'>Empresa: </span>{ cliente.empresa }</p>
            {
              cliente.telefono && (
                <p><span className='font-bold text-gray-800'>Telefono: </span>{ cliente.telefono }</p>
              )
            }
            <p><span className='font-bold text-gray-800'>Email: </span>{ cliente.email }</p>
            {
              cliente.notas && (
                <p><span className='font-bold text-gray-800'>Notas: </span>{ cliente.notas }</p>
              )
            }

          </div>
      </>
    }
    </>
    
  )
}

export default DetalleCliente