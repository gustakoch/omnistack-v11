const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router();

routes.get('/', (request, response) => {
  return response.send({ message: "Welcome to Omnistack" })
})

routes.post('/session', SessionController.store)

routes.get('/profile', ProfileController.index)

routes.get('/ongs', OngController.index)
routes.post('/ongs/create', OngController.store)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents/create', IncidentController.store)
routes.delete('/incidents/:id', IncidentController.index)

module.exports = routes;
