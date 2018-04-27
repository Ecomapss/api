import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Regiao, { schema } from './model'

const router = new Router()
const { cidade, uf } = schema.tree

/**
 * @api {post} /regioes Create regiao
 * @apiName CreateRegiao
 * @apiGroup Regiao
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam cidade Regiao's cidade.
 * @apiParam uf Regiao's uf.
 * @apiSuccess {Object} regiao Regiao's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Regiao not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ cidade, uf }),
  create)

/**
 * @api {get} /regioes Retrieve regiaos
 * @apiName RetrieveRegiaos
 * @apiGroup Regiao
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of regiaos.
 * @apiSuccess {Object[]} rows List of regiaos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /regioes/:id Retrieve regiao
 * @apiName RetrieveRegiao
 * @apiGroup Regiao
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} regiao Regiao's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Regiao not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /regioes/:id Update regiao
 * @apiName UpdateRegiao
 * @apiGroup Regiao
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam cidade Regiao's cidade.
 * @apiParam uf Regiao's uf.
 * @apiSuccess {Object} regiao Regiao's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Regiao not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ cidade, uf }),
  update)

/**
 * @api {delete} /regioes/:id Delete regiao
 * @apiName DeleteRegiao
 * @apiGroup Regiao
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Regiao not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
