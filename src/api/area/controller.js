import { success, notFound } from '../../services/response/'
import { Area } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Area.create(body)
    .then((area) => area.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Area.count(query)
    .then(count => Area.find(query, select, cursor)
      .then((areas) => ({
        count,
        rows: areas.map((area) => area.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Area.findById(params.id)
    .then(notFound(res))
    .then((area) => area ? area.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Area.findById(params.id)
    .then(notFound(res))
    .then((area) => area ? Object.assign(area, body).save() : null)
    .then((area) => area ? area.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Area.findById(params.id)
    .then(notFound(res))
    .then((area) => area ? area.remove() : null)
    .then(success(res, 204))
    .catch(next)
