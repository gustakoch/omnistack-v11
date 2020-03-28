const connection = require('../database/connection')

module.exports = {
  async store(request, response) {
    const { id } = request.body

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first()

    if (!ong) {
      return response.status(400).send({
        ok: false,
        message: 'Usuário não encontrado'
      })
    }

    return response.send(ong)
  }
}
