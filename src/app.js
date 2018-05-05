import http from 'http'
import colors from 'colors'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect(mongo.uri, { useMongoClient: true })
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {

    console.log('|-----------------------------------|')
    console.log('|                                   |')
    console.log('|            ECOMAPSS - API         | '.green)
    console.log('|                                   |')
    console.log('|-----------------------------------|')
    console.log('|IP   ==== %s                       '.magenta,ip)
    console.log('|PORT ==== %d                       '.magenta,port)
    console.log('|ENV  ==== %s                       '.magenta, env)
    console.log('-------------------------------------')

  })
})

export default app
