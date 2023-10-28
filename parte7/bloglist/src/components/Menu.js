import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/authReducer'

function Menu() {
    const style = {
        backgroundColor: '#f0f0f0', // Fondo claro
        padding: '20px', // Espaciado interno
        borderRadius: '5px', // Bordes redondeados
        display: 'flex', // Alinear elementos horizontalmente
        justifyContent: 'space-between', // Espacio uniforme entre elementos
        alignItems: 'center', // Centrar verticalmente
        margin: '20px'
      };
  
  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }


    return (
    <div style={style}>
        <Link to={'/'}>blogs</Link>
        <Link to={'/users'}>users</Link><p> {`${auth.username} logged in`}</p>
        <button onClick={handleLogout} type='submit'>Logout</button>
    </div>
  )
}

export default Menu