const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query

    const [count] = await connection('incidents')
      .count('* as total')

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])
      .orderBy('incidents.id', 'desc')

    response.header('X-Total-Count', count.total)

    return response.send(incidents)
  },

  async destroy(request, response) {
    const { id } = request.params
    const ong_id = request.headers.authorization

    const incident = await connection('incidents')
      .where('id', id)
      .first()

    if (!incident) {
      return response.status(400).send({
        ok: false,
        message: 'Caso não encontrado. Verifique os dados e tente novamente'
      })
    }

    if (incident.ong_id != ong_id) {
      return response.status(401).send({
        ok: false,
        message: 'Caso não pode ser excluído. Verifique os dados e tente novamente'
      })
    }

    await connection('incidents')
      .where('id', id)
      .del()

    return response.status(204).send()
  },

  async store(request, response) {
    const { title, description, value } = request.body
    const ong_id = request.headers.authorization

    const [ id ] = await connection('incidents').insert({
      ong_id,
      title,
      description,
      value
    })

    return response.json({
      ok: true,
      message: 'Caso cadastrado com sucesso!'
    })
  }
}
