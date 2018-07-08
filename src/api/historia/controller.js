import { success, notFound } from '../../services/response/'
import { Historia } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Historia.create(body)
    .then((historia) => historia.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Historia.count(query)
    .then(count => Historia.find(query, select, cursor)
      .then((historias) => ({
        count,
        rows: historias.map((historia) => historia.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Historia.findById(params.id)
    .then(notFound(res))
    .then((historia) => historia ? historia.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Historia.findById(params.id)
    .then(notFound(res))
    .then((historia) => historia ? Object.assign(historia, body).save() : null)
    .then((historia) => historia ? historia.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Historia.findById(params.id)
    .then(notFound(res))
    .then((historia) => historia ? historia.remove() : null)
    .then(success(res, 204))
    .catch(next)
