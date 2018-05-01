import { success, notFound } from '../../services/response/'
import { Coordenada } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Coordenada.create(body)
    .then((coordenada) => coordenada.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Coordenada.count(query)
    .then(count => Coordenada.find(query, select, cursor)
      .then((coordenadas) => ({
        count,
        rows: coordenadas.map((coordenada) => coordenada.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Coordenada.findById(params.id)
    .then(notFound(res))
    .then((coordenada) => coordenada ? coordenada.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Coordenada.findById(params.id)
    .then(notFound(res))
    .then((coordenada) => coordenada ? Object.assign(coordenada, body).save() : null)
    .then((coordenada) => coordenada ? coordenada.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Coordenada.findById(params.id)
    .then(notFound(res))
    .then((coordenada) => coordenada ? coordenada.remove() : null)
    .then(success(res, 204))
    .catch(next)
