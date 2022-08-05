const FactoryDao = require("../DAOS/FactoryDao")
const dao = FactoryDao.getDao()

const resolvers = {
    Query: {
        async getUser(_, { input }){
            return await dao.getUser(input.email)
        },
        async getUsers(){
            return await dao.getUsers()
        }
    },
    Mutation: {
        async createUser(_, { input }){
            return await dao.createUser(input.email, input.password)
        }
    }
}

module.exports = resolvers 