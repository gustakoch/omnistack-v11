import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import logo from '../../assets/logo.svg'
import './profile.css'

export default function Profile() {
  const [incidents, setIncidents] = useState([])
  const history = useHistory()
  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data)
    })

  }, [ongId])

  async function deleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: error.response.data.message,
        focusConfirm: true,
      })
    }
  }

  function logout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
          <img src={logo} alt="Logo Be The Hero"/>
          <span>Bem vindo(a), <strong>{ongName}</strong></span>

          <Link className="button" to="/casos/novo">Cadastrar novo caso</Link>
          <button onClick={logout} type="button">
            <FiPower size={20} color="#E02041" />
          </button>
      </header>

      <h2>Casos cadastrados</h2>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>
            <strong>VALOR</strong>
            <p>{Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(incident.value)}</p>
            <button title="Excluir" onClick={() => deleteIncident(incident.id)}>
              <FiTrash2 size={18} color="#aaa" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
