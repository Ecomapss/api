import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export AreaElemento, { schema } from './model'

const router = new Router()
const { id_area, id_elemento } = schema.tree

/**
 * @api {post} /area-elementos Create area elemento
 * @apiName CreateAreaElemento
 * @apiGroup AreaElemento
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam id_area Area elemento's id_area.
 * @apiParam id_elemento Area elemento's id_elemento.
 * @apiSuccess {Object} areaElemento Area elemento's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Area elemento not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ id_area, id_elemento }),
  create)

/**
 * @api {get} /area-elementos Retrieve area elementos
 * @apiName RetrieveAreaElementos
 * @apiGroup AreaElemento
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of area elementos.
 * @apiSuccess {Object[]} rows List of area elementos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /area-elementos/:id Retrieve area elemento
 * @apiName RetrieveAreaElemento
 * @apiGroup AreaElemento
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} areaElemento Area elemento's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Area elemento not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /area-elementos/:id Update area elemento
 * @apiName UpdateAreaElemento
 * @apiGroup AreaElemento
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam id_area Area elemento's id_area.
 * @apiParam id_elemento Area elemento's id_elemento.
 * @apiSuccess {Object} areaElemento Area elemento's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Area elemento not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ id_area, id_elemento }),
  update)

/**
 * @api {delete} /area-elementos/:id Delete area elemento
 * @apiName DeleteAreaElemento
 * @apiGroup AreaElemento
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Area elemento not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
