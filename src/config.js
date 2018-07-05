/* eslint-disable no-unused-vars */
import path from 'path'
import enviroments from './enviroments'


/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    allowEmptyValues: true,
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}


console.log(process.env.MASTER_KEY)

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    defaultEmail: 'no-reply@ecomapss-api.com',
    sendgridKey: process.env.SENDGRID_KEY,
    masterKey: process.env.MASTER_KEY,
    jwtSecret: process.env.JWT_SECRET,
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  development: {
    mongo: {
      uri: process.env.MONGODB_DEV_URI || 'mongodb://localhost/ecomapss-api-dev',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/ecomapss-api'
    }
  }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
