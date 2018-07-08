import { success, notFound } from '../../services/response/'
import { Fauna } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Fauna.create(body)
    .then((fauna) => fauna.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Fauna.count(query)
    .then(count => Fauna.find(query, select, cursor)
      .then((faunas) => ({
        count,
        rows: faunas.map((fauna) => fauna.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Fauna.findById(params.id)
    .then(notFound(res))
    .then((fauna) => fauna ? fauna.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Fauna.findById(params.id)
    .then(notFound(res))
    .then((fauna) => fauna ? Object.assign(fauna, body).save() : null)
    .then((fauna) => fauna ? fauna.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Fauna.findById(params.id)
    .then(notFound(res))
    .then((fauna) => fauna ? fauna.remove() : null)
    .then(success(res, 204))
    .catch(next)
