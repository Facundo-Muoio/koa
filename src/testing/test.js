const expect = require("chai").expect
const request = require("supertest")
const app = require("../index.js")

describe("Suite Api Restful", () => {

    before(() => { console.log(('================ INICIO ================')) });
    after(() => { console.log('================ FIN ===================') });
    beforeEach(() => { console.log('********** Inicio del test actual *******') });
    afterEach(() => { console.log('********** Fin del test actual **********') });

    describe("GET, api/productos", async() => {
        it("Deberia devolver un array de length 5 con todos los autos como productos", async() => {
            const response = await request(app)
            .get("/api/productos")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            console.log(response._body)
            expect(response.status).to.equal(200)
            expect(response._body).to.have.lengthOf(5)
        })
    })

    
    describe("POST, api/productos", async() => {
        it("Deberia devolver un json con el producto creado", async() => {
        //example :
            const data = {
                nombre: "Peugeot 208",
                precio: 2000,
                foto: "Peugeot Foto",
                id: 5
            }
            const response = await request(app)
            .post("/api/productos")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .send(data)
            console.log(response._body)
            expect(response.status).to.equal(200)
            expect(response._body).to.deep.equal(data)
        })
    })

     
    describe("PUT, api/productos", async() => {
        it("Deberia devolver un objeto con el producto que fue actualizado", async() => {
        //example :
        const data = {
            nombre: "Ford KA",
            precio: "1000",
            foto: "Ford KA Foto",
        }
            const response = await request(app)
            .put("/api/productos/0")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .query(data.nombre, data.precio, data.foto)
            expect(response.status).to.equal(200)
            expect(response.body).to.be.an("object")
        })
    })

    describe("DELETE, api/productos", async() => {
        it("Deberia devolver un objeto con el producto eliminado", async() => {
            const response = await request(app)
            .delete("/api/productos/0")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            expect(response.status).to.equal(200)
            expect(response.body).to.be.an("object")
        })
    })

   
})

