const { createLogger, format, transports } = require('winston')
const { combine, timestamp, prettyPrint, colorize, json } = format
const path = require('path')

/**
 * @param {Object} options
 * @param {Boolean} options.production is production env
 * @param {String} options.logFolder folder to store log in production mode
 * @param {String} options.moduleName name of the module to log
 */
module.exports.initLogger = function initLogger(options) {

  const defaultOption = {
    production: false,
    logFolder: '',
    moduleName: ''
  }

  const logger = createLogger({
    format: combine(
      timestamp(),
      prettyPrint(),
      colorize(),
      json()
    )
  })

  options = {
    ...defaultOption,
    options
  }

  if (options && options.production) {
    if(!options.logFolder) throw new Error('logFolder is required in production mode in logger')

    logger.add(new transports.File({
      level: 'info',
      filename: path.join(options.logFolder, `${options.moduleName}.activities.log`)
    }))

    logger.add(new transports.File({
      level: 'error',
      filename: path.join(options.logFolder, `${options.moduleName}.errors.log`)
    }))
  }

  if (options && !options.production) {
    logger.error = console.error
    logger.info = console.info
  }

  return logger
}