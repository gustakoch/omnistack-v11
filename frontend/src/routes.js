import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile'
import Incident from './pages/incident'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />

        <Route path="/registro" component={Register} />
        <Route path="/perfil" component={Profile} />
        <Route path="/casos/novo" component={Incident} />
      </Switch>
    </BrowserRouter>
  )
}
