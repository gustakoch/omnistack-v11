import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './register.css'
import Logo from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')
  const history = useHistory()

  async function incidentRegister(e) {
    e.preventDefault()

    const data = { name, email, whatsapp, city, uf }

    try {
      const response = await api.post('/ongs/create', data)

      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado!',
        text: `Sua ID para acesso é: ${response.data.id}`,
        focusConfirm: true,
      })

      history.push('/')
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Não foi possível realizar o cadastro. Verifique os dados e tente novamente.',
        focusConfirm: true,
      })
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={Logo} alt="Logo Be The Hero"/>
          <h2>Cadastro</h2>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link className="link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o login
          </Link>
        </section>

        <form onSubmit={incidentRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Adicionar</button>
        </form>
      </div>
    </div>
  )
}
