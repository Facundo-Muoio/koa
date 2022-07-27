const passport = require("passport")

const registerRender =  (req, res) => {
    res.render("registration")
}

const register = passport.authenticate("registration", {
    successRedirect: "/api/login",
    failureRedirect: "/api/failregister",
    passReqToCallback: true
})

const failRegister =  (req, res) => {
    res.render("failregister")
}

module.exports = { registerRender, register, failRegister }