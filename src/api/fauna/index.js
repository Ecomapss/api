import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Fauna, { schema } from './model'

const router = new Router()
const { nome_popular, nome_cientifico, ordem, reino, filo, classe, elemento_id } = schema.tree

/**
 * @api {post} /faunas Create fauna
 * @apiName CreateFauna
 * @apiGroup Fauna
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam nome_popular Fauna's nome_popular.
 * @apiParam nome_cientifico Fauna's nome_cientifico.
 * @apiParam ordem Fauna's ordem.
 * @apiParam reino Fauna's reino.
 * @apiParam filo Fauna's filo.
 * @apiParam classe Fauna's classe.
 * @apiParam elemento_id Fauna's elemento_id.
 * @apiSuccess {Object} fauna Fauna's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Fauna not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ nome_popular, nome_cientifico, ordem, reino, filo, classe, elemento_id }),
  create)

/**
 * @api {get} /faunas Retrieve faunas
 * @apiName RetrieveFaunas
 * @apiGroup Fauna
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of faunas.
 * @apiSuccess {Object[]} rows List of faunas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /faunas/:id Retrieve fauna
 * @apiName RetrieveFauna
 * @apiGroup Fauna
 * @apiSuccess {Object} fauna Fauna's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Fauna not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /faunas/:id Update fauna
 * @apiName UpdateFauna
 * @apiGroup Fauna
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam nome_popular Fauna's nome_popular.
 * @apiParam nome_cientifico Fauna's nome_cientifico.
 * @apiParam ordem Fauna's ordem.
 * @apiParam reino Fauna's reino.
 * @apiParam filo Fauna's filo.
 * @apiParam classe Fauna's classe.
 * @apiParam elemento_id Fauna's elemento_id.
 * @apiSuccess {Object} fauna Fauna's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Fauna not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ nome_popular, nome_cientifico, ordem, reino, filo, classe, elemento_id }),
  update)

/**
 * @api {delete} /faunas/:id Delete fauna
 * @apiName DeleteFauna
 * @apiGroup Fauna
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Fauna not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
