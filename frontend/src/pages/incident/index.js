import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './incident.css'
import logo from '../../assets/logo.svg'

export default function Incident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const history = useHistory()
  const ongId = localStorage.getItem('ongId')

  async function incidentRegister(e) {
    e.preventDefault()
    const data = { title, description, value }

    try {
      const response = await api.post('/incidents/create', data, {
        headers: {
          Authorization: ongId
        }
      })

      Swal.fire({
        icon: 'success',
        text: response.data.message,
        showConfirmButton: false,
        timer: 2000
      })

      history.push('/perfil')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: error.response.data.message
      })
    }
  }

  return (
    <div className="incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Logo Be The Hero"/>

          <h2>Cadastrar novo caso</h2>
          <p>Descreva o caso detalhadamente para encontrar um herói que irá resolver isso.</p>

          <Link className="link" to="/perfil">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o meu perfil
          </Link>
        </section>

        <form onSubmit={incidentRegister}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">Adicionar</button>
        </form>
      </div>
    </div>
  )
}
