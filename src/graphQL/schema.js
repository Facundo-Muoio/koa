const { makeExecutableSchema } = require("@graphql-tools/schema")
const resolvers  = require("./resolvers")

const typeDefs = `
    type User {
         _id: ID,
         email: String!,
         password: String!
     }
    
    input UserInput {
        email: String,
        password: String
    }

    input EmailInput{
        email: String!
    }

    type Query {
        getUser(input: EmailInput): User,
        getUsers : [User]
    }

    type Mutation {
        createUser(input: UserInput) : User
    }
`

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})

module.exports = schema 