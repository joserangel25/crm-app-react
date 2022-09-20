import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cliente = ({cliente, handleEliminar}) => {
  const { id, nombre, empresa, email, telefono, notas } = cliente;
  const navigate = useNavigate();

  const handleDetailsClient = () => {
    navigate(`/clientes/${id}`, { state: { cliente } })
  }
  return (
    <tr className='border-b hover:bg-gray-100'>
      <td className='p-3 text-center'>{nombre}</td>
      <td className='p-3 text-center'>
        <p><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
        <p><span className='text-gray-800 uppercase font-bold'>Tel: </span>{telefono}</p>
      </td>
      <td className='p-3 text-center'>{empresa}</td>
      <td className='p-3 text-center'>

        <button 
          type='button' 
          className='bg-yellow-500 hover:bg-yellow-600 block w-full uppercase text-white p-2 font-bold 
          text-xs'
          onClick={handleDetailsClient}
        >
          Detalle
        </button>

        <button 
          type='button' 
          className='mt-2 bg-blue-600 hover:bg-blue-700 block w-full uppercase text-white p-2 font-bold 
          text-xs'
          onClick={() => navigate(`editar/${id}`)}
        >
          Editar
        </button>

        <button 
          type='button' 
          className='mt-2 bg-red-600 hover:bg-red-700 block w-full uppercase text-white p-2 font-bold 
          text-xs'
          onClick={() => handleEliminar(id)}
        >
          Eliminar
        </button>

      </td>
    </tr>
  )
}

export default Cliente