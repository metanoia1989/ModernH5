/**
 * 依赖 graphql, express-graphql, express
 */
var express = require('express')
var { graphqlHTTP } = require('express-graphql')
var { buildSchema } = require('graphql')

// *****************************************************
// 基础的标量类型 String, Int, Float, Boolean
// 没有传值，则为 null，使用 String! 表示为 non-nullable
//******************************************************

// 构造 schame
var schema = buildSchema(`
    type Query  {
        rollDice(numDice: Int!, numSides: Int): [Int]
    }
`)

// root provider 提供每一个API endpoint 的 resolver
var root = {
    rollDice: ({ numDice, numSides }) => {
        var output = []

        for (var i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)))
        }

        return output
    }     
}

var app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}))
app.listen(4545)
console.log("Running a GraphQL API server at http://localhost:4545/graphql")