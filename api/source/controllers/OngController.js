const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*')

    return response.send(ongs)
  },

  async store(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = crypto.randomBytes(8).toString('HEX')

    const ong = await connection('ongs').where('email', email).first()

    if (ong) {
      return response.status(400).send({
        ok: false,
        message: 'Email já cadastrado'
      })
    }

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return response.send({ id });
  }
}
