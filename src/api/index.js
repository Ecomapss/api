import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import area from './area'
import regiao from './regiao'
import areaElemento from './area-elemento'
import fauna from './fauna'
import elemento from './elemento'
import historia from './historia'
import mail from './mail'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/areas', area)
router.use('/regioes', regiao)
router.use('/area-elementos', areaElemento)
router.use('/faunas', fauna)
router.use('/elementos', elemento)
router.use('/historias', historia)
router.use('/mail', mail)
router.get('/', home)

function home(req, res) {
  return res.status(200).send("ECOMAPSS - API: ONLINE")
}

export default router
