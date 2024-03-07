const winston = require('winston')
const { mode } = require('../config')

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4 ,
    },
    colors: {
        fatal: 'magenta',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http:'green',
        debug: 'white'
    }
}



const loggerProduction = winston.createLogger({
    levels: customLevelOptions.levels,

    transports: [
        new winston.transports.Console({level: "info",
        format: winston.format.combine(
            winston.format.colorize({ colors: customLevelsOptions.colors }),
            winston.format.simple()
        )
    }),
        new winston.transports.File({
            filename: './errors.log',
            level:'warning',
            format: winston.format.simple()
        })
    ]
})
const loggerdevelopment = winston.createLogger({
    levels: customLevelOptions.levels,

    transports: [
        new winston.transports.Console({level: "debug",
        format: winston.format.combine(
            winston.format.colorize({ colors: customLevelsOptions.colors }),
            winston.format.simple()
        )
    }),
        new winston.transports.File({
            filename: './errors.log',
            level:'warning',
            format: winston.format.simple()
        })
    ]
})

const logger = mode === 'production' ? loggerProduction : loggerdevelopment;

const addLogger = (req,res,next) => {
    req.logger = logger
    req.logger.http(` ${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`)
    next()
}

module.exports = { addLogger, logger }