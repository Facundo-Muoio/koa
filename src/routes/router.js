const { Router } = require("express") 
const router = Router()
const passport = require("passport")
const { fork } = require("child_process")
const { cpus } = require("os")
const CPUs = cpus().length
const cluster = require("cluster")
const http = require("http")
const compression = require("compression")
const logger = require("../logger/logger.js")


router.get("/",(req, res) =>{
   logger.error(`error al cargar el chat de mensajes`)
   res.render("index")
})

// router.get("/api/productos-test", (req, res) => {
//     const productosFake = generarProducts()
//     logger.error(`error al cargar los productos`)
//     res.render("productos-test", {productos: productosFake})
// })

router.get("/api/registration", (req, res) => {
    res.render("registration")
})

router.post("/api/registration", passport.authenticate("registration", {
    successRedirect: "/api/login",
    failureRedirect: "/api/failregister",
    passReqToCallback: true
}))

router.get("/api/login", (req, res) => {
    res.render("login")
})

router.post("/api/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/api/faillogin",
  passReqToCallback: true
}))

router.get("/api/faillogin", (req, res) => {
    res.render("faillogin")
}
)
router.get("/api/failregister", (req, res) => {
    res.render("failregister")
})

router.get("/api/logout", (req, res) => {
    req.logout((err) => {
        if(err){
            console.log(err)
        } else {
            res.redirect("/")
        }
    })
})

router.get("/info", (req, res) => {
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
})

router.get("/infoCompression", compression(), (req, res) => {
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
})

router.get("/api/randoms", (req, res) => {
    res.json("desactivamos el fork")
    // const computo = fork("./src/computo.js")
    // computo.send(req.query)
    // computo.on("message", resultado => {
    //     res.json({ resultado })
    // })
})

router.get("*", (req, res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no está implementada`)
})

module.exports = router