const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema.js")

class GraphQLController {
    constructor(){
        return graphqlHTTP({
            schema: schema, 
            graphiql: true
        })
    }
}

module.exports = GraphQLController