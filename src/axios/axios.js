const axios = require("axios")
const URL = "http://localhost:8080/api/productos"

function axiosGet(){
    return axios.get(URL)
    .then(( res )=> {
        for (let e of res.data){
            console.log(e)
        }
    })
    .catch((err) => {
        console.log(err)
    })    
}

function axiosPost(){
    return axios.post(URL, {
        nombre: "Ford KA",
        precio: 10000,
        foto: "Ford KA Image"
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

function axiosPut(){
    return axios.put("http://localhost:8080/api/productos",{
        data:{
            nombre: "Peugeout 208",
            precio: 30000,
            foto: "peogeout 308 image"
        },
        params:{
            id: "1"
        },
        headers: {
            contentType: "application/json",
        }
    })
    .then((res) => {
    })
    .catch((err) => {
        console.log(err)
    })
}

function axiosDelete(){
    console.log("inicio bien")
    axios.delete("http://localhost:8080/api/productos/1")
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}


async function makeRequest(){
    await Promise.all([axiosGet(), axiosPost(), axiosPut()])
    .then((results) => {
        const todosLosProductos = results[0]
        const productoAñadido = results[1]
        const productoActualizado = results[2]
        console.log(todosLosProductos, productoAñadido, productoActualizado)
    })

}

module.exports = { makeRequest }
