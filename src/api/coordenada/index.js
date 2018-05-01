import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Coordenada, { schema } from './model'

const router = new Router()
const { longitude, latitude, precisao, id_area_elemento } = schema.tree

/**
 * @api {post} /coordenadas Create coordenada
 * @apiName CreateCoordenada
 * @apiGroup Coordenada
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam longitude Coordenada's longitude.
 * @apiParam latitude Coordenada's latitude.
 * @apiParam precisao Coordenada's precisao.
 * @apiParam id_area_elemento Coordenada's id_area_elemento.
 * @apiSuccess {Object} coordenada Coordenada's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coordenada not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ longitude, latitude, precisao, id_area_elemento }),
  create)

/**
 * @api {get} /coordenadas Retrieve coordenadas
 * @apiName RetrieveCoordenadas
 * @apiGroup Coordenada
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of coordenadas.
 * @apiSuccess {Object[]} rows List of coordenadas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /coordenadas/:id Retrieve coordenada
 * @apiName RetrieveCoordenada
 * @apiGroup Coordenada
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} coordenada Coordenada's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coordenada not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /coordenadas/:id Update coordenada
 * @apiName UpdateCoordenada
 * @apiGroup Coordenada
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam longitude Coordenada's longitude.
 * @apiParam latitude Coordenada's latitude.
 * @apiParam precisao Coordenada's precisao.
 * @apiParam id_area_elemento Coordenada's id_area_elemento.
 * @apiSuccess {Object} coordenada Coordenada's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coordenada not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ longitude, latitude, precisao, id_area_elemento }),
  update)

/**
 * @api {delete} /coordenadas/:id Delete coordenada
 * @apiName DeleteCoordenada
 * @apiGroup Coordenada
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Coordenada not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
