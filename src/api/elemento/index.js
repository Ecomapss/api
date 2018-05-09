import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Elemento, { schema } from './model'

const router = new Router()
const { info, estado } = schema.tree

/**
 * @api {post} /elementos Create elemento
 * @apiName CreateElemento
 * @apiGroup Elemento
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam info Elemento's info.
 * @apiParam estado Elemento's estado.
 * @apiSuccess {Object} elemento Elemento's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Elemento not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ info, estado }),
  create)

/**
 * @api {get} /elementos Retrieve elementos
 * @apiName RetrieveElementos
 * @apiGroup Elemento
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of elementos.
 * @apiSuccess {Object[]} rows List of elementos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /elementos/:id Retrieve elemento
 * @apiName RetrieveElemento
 * @apiGroup Elemento
 * @apiSuccess {Object} elemento Elemento's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Elemento not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /elementos/:id Update elemento
 * @apiName UpdateElemento
 * @apiGroup Elemento
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam info Elemento's info.
 * @apiParam estado Elemento's estado.
 * @apiSuccess {Object} elemento Elemento's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Elemento not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ info, estado }),
  update)

/**
 * @api {delete} /elementos/:id Delete elemento
 * @apiName DeleteElemento
 * @apiGroup Elemento
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Elemento not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
