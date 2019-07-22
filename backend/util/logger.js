const pino = require('pino')
const config = require('../config')

const fatalLogger = pino({
  name: `${config.app.name.toLowerCase()}::fatal`,
  errorLikeObjectKeys: ['err', 'error'],
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})
const errorLogger = pino({
  name: `${config.app.name.toLowerCase()}::error`,
  errorLikeObjectKeys: ['err', 'error'],
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})
const warnLogger = pino({
  name: `${config.app.name.toLowerCase()}::warn`,
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})
const infoLogger = pino({
  name: `${config.app.name.toLowerCase()}::info`,
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})

const traceLogger = pino({
  name: `${config.app.name.toLowerCase()}::trace`,
  prettyPrint: {
    translateTime: 'SYS:standard'
  }
})

module.exports = {
  fatal: (message, error, meta) => {
    __typecheck(message, __type.string, true)
    __typecheck(error, __type.error, true)
    __typecheck(meta, __type.object)

    fatalLogger.fatal(message, meta || error.toString())
  },

  error: (message, error, meta) => {
    __typecheck(message, __type.string, true)
    __typecheck(error, __type.error, true)
    __typecheck(meta, __type.object)

    errorLogger.error(message, meta || error.toString())
  },

  warn: (message, error, meta) => {
    __typecheck(message, __type.string, true)
    __typecheck(error, __type.error, true)
    __typecheck(meta, __type.object)

    warnLogger.warn(message, meta || error.toString())
  },

  trace: (message, meta) => {
    __typecheck(message, __type.string, true)
    __typecheck(meta, __type.object)

    traceLogger.info(message, meta || {})
  },

  info: (message, log) => {
    __typecheck(message, __type.string, true)
    __typecheck(log, __type.any)

    infoLogger.info(message, log || '')
  }
}