import { success, notFound } from '../../services/response/'
import { Elemento } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Elemento.create(body)
    .then((elemento) => elemento.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Elemento.count(query)
    .then(count => Elemento.find(query, select, cursor)
      .then((elementos) => ({
        count,
        rows: elementos.map((elemento) => elemento.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Elemento.findById(params.id)
    .then(notFound(res))
    .then((elemento) => elemento ? elemento.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Elemento.findById(params.id)
    .then(notFound(res))
    .then((elemento) => elemento ? Object.assign(elemento, body).save() : null)
    .then((elemento) => elemento ? elemento.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Elemento.findById(params.id)
    .then(notFound(res))
    .then((elemento) => elemento ? elemento.remove() : null)
    .then(success(res, 204))
    .catch(next)
