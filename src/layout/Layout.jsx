import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {
  const { pathname } = useLocation();
  
  return (
    <div className='md:flex md:min-h-screen'>
      <div className='md:w-1/4 bg-blue-900 p-5'>
        <h2 className='text-4xl font-black text-center text-white'>CRM - CLientes</h2>
        <nav className='mt-10 '>
          <Link
            className={`${pathname === '/clientes' ? 'text-blue-300 font-bold' : 'text-white'} text-2xl block mt-2`}
            to='/clientes'
          >
            Clientes
          </Link>
          <Link
            className={`${pathname === '/clientes/nuevo' ? 'text-blue-300 font-bold' : 'text-white'} text-2xl block mt-2`}
            to='/clientes/nuevo'
          >
            Nuevo Cliente
          </Link>
        </nav>
      </div>
      <div id='scroller' className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
        
        <Outlet />
      </div>
    </div>
  )
}

export default Layout