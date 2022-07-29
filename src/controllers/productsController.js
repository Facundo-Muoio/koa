const { generarProducts, createNewProduct, updateProduct, deleteProduct, getProducts } = require("../services/productos")

const getAllProducts = (req, res) => {
    const productos = generarProducts()
    res.send(productos)
}

const createProduct = (req, res) => {
    const {nombre, precio, foto } = req.body
    const productos = getProducts()
    let id
    !productos.length ? id = 0 : id = productos[productos.length -1].id + 1 
    const newProduct = {
        nombre,
        precio, 
        foto, 
        id
    } 
    const productCreated = createNewProduct(newProduct)
    res.json({nombre: productCreated.nombre, precio: productCreated.precio, foto: productCreated.foto, id})
}

const updateProductById = (req, res) => {
    const { id } = req.params
    const { nombre, precio, foto } = req.body
    const updatedProduct = updateProduct(id, nombre, precio, foto)
    res.json({nombre: updatedProduct.nombre, precio: updatedProduct.precio, foto: updatedProduct.foto, id: updatedProduct.id})
}

const deleteProductById = (req, res) => {
    const { id } = req.params
    const {nombre, precio, foto} = deleteProduct(id)
    res.json({nombre, precio, foto})
}

module.exports = { getAllProducts, createProduct, updateProductById, deleteProductById }