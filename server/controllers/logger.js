const { createLogger, format, transports } = require('winston')


const artistlogger = createLogger({
    transports:[
        new transports.File({
            filename:'artists.log',
            level: 'info',
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'artists-error.log',
            level: 'error',
            format: format.combine(format.timestamp(),format.json())
        }),
        

    ]
})

module.exports = {artistlogger}