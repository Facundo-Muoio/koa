const { faker } = require("@faker-js/faker") 

const productosFake = []

function generarProducts(){
    if(!productosFake.length){
        for(let i = 0; i < 5 ; i++){
            let productoFake = {
                nombre:  faker.vehicle.vehicle(),
                precio:  faker.finance.amount(),
                foto:  faker.image.imageUrl(),
                id: i 
            }
            productosFake.push(productoFake)
        }
    }
    return productosFake
}

function createNewProduct(newProduct){
    productosFake.push(newProduct)
    return newProduct
}

function updateProduct(id, nombre, precio, foto){
   nombre ? productosFake[id].nombre = nombre : ""
   precio ? productosFake[id].precio = precio : ""
   foto ? productosFake[id].foto = foto : ""
   const productUpdated = productosFake[id]
   return productUpdated
}

function deleteProduct(id){
    const productDeleted = productosFake.splice(id, 1)
    return productDeleted[0]
}

function getProducts(){
    return productosFake
}


module.exports = { generarProducts, createNewProduct, updateProduct, deleteProduct, getProducts }