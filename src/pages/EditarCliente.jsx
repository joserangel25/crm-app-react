import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AlertaInput from '../components/AlertaInput';
import Formulario from '../components/Formulario';

const EditarCliente = () => {
  const { id } = useParams();
  const [ cliente, setCliente ] = useState({});
  const [ cargando, setCargando ] = useState(true)

  useEffect(() => {
    const getClienteById = async () => {
      const res = await fetch(`${import.meta.env.VITE_URL_API}/${id}`);
        // console.log(res)
        if(res.ok){
          const infoCLiente = await res.json();
          setCliente(infoCLiente);
          setCargando(false)
        }else {
          setCliente({error: `Error ${res.status}: ${res.statusText}`})
          setCargando(false);
        }
    }
    getClienteById()
  }, [])
  
  return (
        cliente.error ? <AlertaInput>
          <p>Cliente con ID {id} no encontrado o no existe en la base de datos</p>
          {cliente.error}
        </AlertaInput>
        :
        <>
          <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
          <p className='mt-3'>Ajusta los datos de tu cliente</p>
          <Formulario cargando={cargando} cliente={cliente}/>
        </>
  )
}

export default EditarCliente