
const logout = (req, res) => {
    req.logout((err) => {
        if(err){
            console.log(err)
        } else {
            res.redirect("/")
        }
    })
}

module.exports = { logout }