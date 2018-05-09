import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Historia, { schema } from './model'

const router = new Router()
const { titulo, descricao, elemento_id } = schema.tree

/**
 * @api {post} /historias Create historia
 * @apiName CreateHistoria
 * @apiGroup Historia
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam titulo Historia's titulo.
 * @apiParam descricao Historia's descricao.
 * @apiParam elemento_id Historia's elemento_id.
 * @apiSuccess {Object} historia Historia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Historia not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ titulo, descricao, elemento_id }),
  create)

/**
 * @api {get} /historias Retrieve historias
 * @apiName RetrieveHistorias
 * @apiGroup Historia
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of historias.
 * @apiSuccess {Object[]} rows List of historias.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /historias/:id Retrieve historia
 * @apiName RetrieveHistoria
 * @apiGroup Historia
 * @apiSuccess {Object} historia Historia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Historia not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /historias/:id Update historia
 * @apiName UpdateHistoria
 * @apiGroup Historia
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam titulo Historia's titulo.
 * @apiParam descricao Historia's descricao.
 * @apiParam elemento_id Historia's elemento_id.
 * @apiSuccess {Object} historia Historia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Historia not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ titulo, descricao, elemento_id }),
  update)

/**
 * @api {delete} /historias/:id Delete historia
 * @apiName DeleteHistoria
 * @apiGroup Historia
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Historia not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
