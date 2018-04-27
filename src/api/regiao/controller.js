import { success, notFound } from '../../services/response/'
import { Regiao } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Regiao.create(body)
    .then((regiao) => regiao.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Regiao.count(query)
    .then(count => Regiao.find(query, select, cursor)
      .then((regiaos) => ({
        count,
        rows: regiaos.map((regiao) => regiao.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Regiao.findById(params.id)
    .then(notFound(res))
    .then((regiao) => regiao ? regiao.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Regiao.findById(params.id)
    .then(notFound(res))
    .then((regiao) => regiao ? Object.assign(regiao, body).save() : null)
    .then((regiao) => regiao ? regiao.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Regiao.findById(params.id)
    .then(notFound(res))
    .then((regiao) => regiao ? regiao.remove() : null)
    .then(success(res, 204))
    .catch(next)
