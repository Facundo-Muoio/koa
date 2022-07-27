const logger = require("../logger/logger.js")

const rutasNoImplementadas = (req, res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no está implementada`)
}

module.exports = { rutasNoImplementadas }