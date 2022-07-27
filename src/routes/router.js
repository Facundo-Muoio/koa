const { Router } = require("express") 
const router = Router()
const { cpus } = require("os")
const compression = require("compression")
const logger = require("../logger/logger.js")
const { register, registerRender, failRegister } = require("../controllers/registroController")
const { getInfo, getInfoCompression } = require("../controllers/infoController")
const { loginRender, login, failLogin } = require("../controllers/loginController")
const { logout } = require("../controllers/logoutController")
const { rutasNoImplementadas } = require("../controllers/noImplementadosController")
const getAllProducts = require("../controllers/productsController")


router.get("/",(req, res) =>{
   logger.error(`error al cargar el chat de mensajes`)
   res.render("index")
})

router.get("/api/registration", registerRender)

router.post("/api/registration", register)

router.get("/api/login", loginRender)

router.post("/api/login", login)

router.get("/api/faillogin", failLogin)

router.get("/api/failregister", failRegister)

router.get("/api/logout", logout)

router.get("/info", getInfo)

router.get("/infoCompression", compression, getInfoCompression)

router.get("/api/productos", getAllProducts)

router.get("*", rutasNoImplementadas)

module.exports = router