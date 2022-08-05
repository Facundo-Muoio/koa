const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
const apiUsers = require("../api/api")


const schema = buildSchema(
   ` 
    type User {
        id: ID!,
        email: String!,
        password: String!
    }

    input UserInput {
        email: String,
        password: String
    }

    input EmailInput{
        email: String
    }

    type Query {
        getUser (email: EmailInput): User,
    }

    type Mutation {
        createUser (datos: UserInput) : User
    }

    `
)

class GraphQLController {
    constructor(){
        const api = new apiUsers()
        return graphqlHTTP({
            schema: schema, 
            rootValue: {
                getUser: api.getUser,
                createUser: api.createUser, 
            },
            graphiql: true
        })
    }
}

module.exports = GraphQLController