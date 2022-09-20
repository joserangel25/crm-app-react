import React from 'react'

const AlertaInput = ({children, error}) => {
  return (
    <div className={`text-center text-white my-4 py-3 ${error ? 'bg-red-800' : 'bg-green-800'} uppercase font-bold`}>
      {children}
    </div>
  )
}

export default AlertaInput;