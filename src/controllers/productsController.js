const generarProducts = require("../services/productos")

const getAllProducts = (req, res) => {
    const productos = generarProducts()
    console.log(productos)
    res.render("productos", { productos })
}

module.exports = getAllProducts