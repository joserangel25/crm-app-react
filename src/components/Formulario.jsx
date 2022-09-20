import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AlertaInput from './AlertaInput';
import Spinner from './Spinner';

const Formulario = ({cliente, cargando}) => {
  // console.log(cliente)
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object({
    nombre: Yup.string()
               .min(3, 'El nombre es muy corto') 
               .max(20, 'El nombre es muy largo')
               .required('Nombre del cliente es obligatorio'),
    empresa: Yup.string()
                .required('El nombre de la empresa es obligatorio'),
    email: Yup.string().email('Email no valido').required('El Email es obligario'),
    telefono: Yup.number()
                 .typeError('Teléfono no válido')
                 .integer('Numero no valido')
                 .positive('Numero no valido')
                 .min(1111111111, 'Cantidad de numeros no valido')
  });

  const handleSubmit = async (datos) => {
     const url = 'http://localhost:4000/clientes';
    try {
      let res;
      if(cliente.id){
        //Editando un cliente registrado
        res = await fetch(`${url}/${cliente.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datos)
        })
      } else {
        //Nuevo registro de cliente   
        res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
      })
      }
      // console.log(res)
      const response = {};
      if(res.statusText === 'OK'){
        response.tarea = 'editar';
        response.data = await res.json();
      } else {
        response.tarea = 'crear';
        response.data = await res.json();
      }
      // const respuesta = await res.json();
      // console.log(response)
      navigate('/clientes', { state:  response  });

    } catch (error) {
      console.log(error)
    }
  }
  return (
   cargando ? <Spinner /> : (
  
    <div className='bg-white mt-10 px-5 py-10 rounded-lg shadow-md md:w-3/4 m-auto'>
      <h1 className='text-gray-600 font-bold uppercase text-xl text-center'>{cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}</h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? '',
          empresa: cliente?.empresa ?? '',
          email: cliente?.email ?? '',
          telefono: cliente?.telefono ?? '',
          notas: cliente?.notas ?? '',
        }}
        enableReinitialize={true}
        onSubmit={ async (values, { resetForm }) => {
          await handleSubmit(values)

          resetForm();
          }
        }
        validationSchema={nuevoClienteSchema}
      >
        {({errors, touched}) => {
          // console.log(errors)
          return (
        <Form>
          <div className='mb-4'>
            <label
              className='text-gray-800 font-bold'
              htmlFor="nombre"
            >Nombre:</label>
            <Field 
              id="nombre"
              name='nombre'
              type='text'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Nombre del cliente'
            />

            {
              errors.nombre && touched.nombre ?
              <AlertaInput error={true}>{errors.nombre}</AlertaInput>
              :
              ''
            }
          </div>

          

          <div className='mb-4'>
            <label
              className='text-gray-800 font-bold'
              htmlFor="empresa"
            >Empresa:</label>
            <Field 
              id="empresa"
              name='empresa'
              type='text'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Empresa del cliente'
            />
            {
              errors.empresa && touched.empresa ?
              <AlertaInput error={true}>{errors.empresa}</AlertaInput>
              :
              ''
            }
          </div>

          <div className='mb-4'>
            <label
              className='text-gray-800 font-bold'
              htmlFor="email"
            >Email:</label>
            <Field 
              id="email"
              name='email'
              type='email'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Email del cliente'
            />
            {
              errors.email && touched.email ?
              <AlertaInput error={true}>{errors.email}</AlertaInput>
              :
              ''
            }
          </div>

          <div className='mb-4'>
            <label
              className='text-gray-800 font-bold'
              htmlFor="telefono"
            >Celular:</label>
            <Field 
              id="telefono"
              name='telefono'
              type='tel'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Celular del cliente'
            />
            {
              errors.telefono && touched.telefono ?
              <AlertaInput error={true}>{errors.telefono}</AlertaInput>
              :
              ''
            }
          </div>

          <div className='mb-4'>
            <label
              className='text-gray-800 font-bold'
              htmlFor="notas"
            >Notas:</label>
            <Field 
              as='textarea'
              id="notas"
              name='notas'
              type='text'
              className='mt-2 block w-full p-3 bg-gray-50 h-40'
              placeholder='Notas del cliente'
            />
          </div>

          <input 
            type='submit' 
            value={cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}
            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg outline-none 
            cursor-pointer hover:bg-blue-600' 
          />
        </Form>
        )}}
      </Formik>
    </div>
    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario