const express = require("express")
const app = express()
const { createServer } = require("http")
const { Server } = require("socket.io")
const httpServer = createServer(app)
const io = new Server(httpServer)
const path = require("path")
const router = require("./routes/router")
const Mensajes = require("./contenedores/mensajes")
const mensaje = new Mensajes()

const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const passport = require("passport")
const { resolveSoa } = require("dns")
const parseArgs = require("minimist")
require("./passport/local-auth")
require("dotenv").config()
const ServerClusterFork  = require("./server/server")
const { makeRequest } = require("./axios/axios")
const { default: axios } = require("axios")



//config port with minimist
const options = {
    alias: { 
        p: "port",
        m: "mode"
    }, 
    default: {
         port:  process.env.PORT || process.env.YOUR_PORT,
         mode: "fork"
        } 
    }

const { port, mode } =  parseArgs(process.argv.slice(2), options)

//setting server
app.set("views", path.join(__dirname, "public/views"))
app.set("view engine", "ejs")
app.set('json spaces', 2)

//middlewares
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser("secreto"))
app.use(session({
    store: MongoStore.create({mongoUrl: process.env.MONGO_URL_SERVER, 
    mongoOptions: advancedOptions}
    ),
    secret: "secreto",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 100000
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    app.locals.user = req.user
    next()
})

//routes
app.use(router)


//socket.io
io.on("connection", async (socket) => {
    // console.log("Socket conectado: " + socket.connected)
    console.log("Socket id: " + socket.id)

    async function listarMensajes(){
        io.emit("mensajesGuardados:server", await mensaje.getMessages())
    }
    
    listarMensajes()

    socket.on("menasjeClienteSide", async (data) => {
        await mensaje.saveMessage(data)
        io.emit("mensajesServerSide", await mensaje.getMessages())
    })

})


// starting server
// httpServer.listen((port),() => console.log(`Server listen on http://${process.env.YOUT_HOST}:${port} - MODE: ${mode}`))
const server = new ServerClusterFork()
server[mode](port, httpServer)
