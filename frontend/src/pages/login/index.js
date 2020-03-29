import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './login.css'
import heroes from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'

export default function Login() {
  const [id, setId] = useState('')
  const history = useHistory()

  async function login(e) {
    e.preventDefault()

    try {
      const response = await api.post('/session', { id })

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)

      history.push('/perfil')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: error.response.data.message,
        focusConfirm: true,
      })
    }

  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Logo Be The Hero"/>

        <form onSubmit={login}>
          <h2>Faça seu login</h2>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="link" to="/registro">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroes} alt="Heroes"/>
    </div>
  )
}
