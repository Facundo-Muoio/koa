const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const FactoryDao = require("../DAOS/FactoryDao")
const bcrypt = require("bcrypt")
const dao = FactoryDao.getDao()

function verifypassword(password, user){
    return bcrypt.compareSync(password, user.password)
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await dao.getUserById(id)
    done(null, user)
})


passport.use("registration", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
async (req, email, password, done) => {
    const user = await dao.getUser(email)
    if(user){
        return done(null, false)
    } else {
        const newUser = await dao.createUser(email, password)
        done(null, newUser)
    }
}
))

passport.use("login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true 
},
async (req, email, password, done) => {
    const user = await dao.getUser(email)
    if(!user){
        return done(null, false)
    }
    if(!verifypassword(password, user)){
        return done(null, false)
    }
    done(null, user)
}
))