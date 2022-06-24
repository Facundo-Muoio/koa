const winston = require("winston")

function DevLogger(){
    const devLogger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: "info"  }),
            new winston.transports.File({ filename: "warn.log", level: "warn"}),
            new winston.transports.File({ filename: "error.log", level: "error"})
        ]
    })
    return devLogger
}

module.exports = DevLogger()