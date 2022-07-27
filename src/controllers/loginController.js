const passport = require("passport")

const loginRender = (req, res) => {
    res.render("login")
}

const login = passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/api/faillogin",
  passReqToCallback: true
})

const failLogin = (req, res) => {
    res.render("faillogin")
}

module.exports = { loginRender, login, failLogin}