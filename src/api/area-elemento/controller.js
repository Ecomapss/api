import { success, notFound } from '../../services/response/'
import { AreaElemento } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  AreaElemento.create(body)
    .then((areaElemento) => areaElemento.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  AreaElemento.count(query)
    .then(count => AreaElemento.find(query, select, cursor)
      .then((areaElementos) => ({
        count,
        rows: areaElementos.map((areaElemento) => areaElemento.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  AreaElemento.findById(params.id)
    .then(notFound(res))
    .then((areaElemento) => areaElemento ? areaElemento.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  AreaElemento.findById(params.id)
    .then(notFound(res))
    .then((areaElemento) => areaElemento ? Object.assign(areaElemento, body).save() : null)
    .then((areaElemento) => areaElemento ? areaElemento.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  AreaElemento.findById(params.id)
    .then(notFound(res))
    .then((areaElemento) => areaElemento ? areaElemento.remove() : null)
    .then(success(res, 204))
    .catch(next)
