const logger = require("../logger/logger.js")
const { cpus } = require("os")
const CPUs = cpus().length

const getInfo = (req, res) => {
    const entryArguments = process.argv
    const systemName = process.platform
    const versionNode = process.version
    const memory = process.memoryUsage()
    const path  =   process.execPath
    const processId = process.pid
    const projectDirectory = process.cwd()
    const numCpus = CPUs
    // BYTES SIN COMPRESSION 2.7 KB
    const { method, url } = req
    logger.info(`La ruta: ${url} - método: ${method}`)
    res.render("info", {entryArguments, systemName, versionNode, memory, path, processId, projectDirectory, numCpus})
}

const getInfoCompression =  (req, res) => {
    const entryArguments = process.argv
    const systemName = process.platform
    const versionNode = process.version
    const memory = process.memoryUsage()
    const path  =   process.execPath
    const processId = process.pid
    const projectDirectory = process.cwd()
    const numCpus = CPUs
    console.log(`
    Argumentos de entrada: ${entryArguments}
    Nombre de plataforma: ${systemName}
    Version de node.js: ${versionNode}
    Memoria total reservada: ${memory.rss}
    Path de ejecución: ${path}
    Process id: ${processId}
    Carpeta del proyecto: ${projectDirectory}
    Número de cpus: ${cpus().length}
    `)
    //BYTES CON COMPRESSION 1.3 KB
    res.render("info", {entryArguments, systemName, versionNode, memory, path, processId, projectDirectory, numCpus})
}

module.exports = { getInfo,  getInfoCompression }