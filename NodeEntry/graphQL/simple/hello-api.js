/**
 * 依赖 graphql, express-graphql, express
 */
var express = require('express')
var { graphqlHTTP } = require('express-graphql')
var { graphql, buildSchema } = require('graphql')

// 构造 schame
var schema = buildSchema(`
    type Query  {
        hello: String
    }
`)

// root provider 提供每一个API endpoint 的 resolver
var root = {
    hello: () => {
        return 'Hello world!';
    },
}

var app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}))
app.listen(4545)
console.log("Running a GraphQL API server at http://localhost:4545/graphql")