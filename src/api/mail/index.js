import { Router } from 'express'
import { master } from '../../services/passport'
import { create } from './controller'
import { middleware as body } from 'bodymen'


const router = new Router()
const { email, data } = {}


/**
 * @api {post} /mail Create mail
 * @apiName CreateMail
 * @apiGroup Mail
 * @apiPermission master
 * @apiParam {String} email Email address to receive the password reset token.
 * @apiParam {String} data Data which contains information what will be sent.
 * @apiSuccess {Object} mail Mail's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Mail not found.
 * @apiError 401 master access only.
 */
router.post('/', 
  body({ email, data: {type: Object} }),
  master(),
  create)

export default router
