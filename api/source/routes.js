const express = require('express')

const routes = express.Router();

routes.get('/', (request, response) => {
  return response.send({ ok: true })
})

module.exports = routes;
