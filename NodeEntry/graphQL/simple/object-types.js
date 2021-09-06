/**
 * 依赖 graphql, express-graphql, express
 */
var express = require('express')
var { graphqlHTTP } = require('express-graphql')
var { buildSchema } = require('graphql')

// *****************************************************
// 对象类型，这里有点看不懂了
//******************************************************

// 构造 schame
var schema = buildSchema(`
    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numRolls: Int!): [Int]
    }
    type Query {
        getDie(numSides: Int): RandomDie
    }
`)

// 这个类实现了RandomDie GraphQL类型
class RandomDie {
    constructor (numSides) {
        this.numSides = numSides
    }
    
    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides)
    }
    
    roll({ numRolls }) {
        var output = []
        for (var i = 0; i < numRolls; i++) {
            output.push(this.rollOnce())
        }
        return output 
    }
}

// root provider 提供每一个API endpoint 的 resolver
var root = {
    getDie: ({ numSides }) => {
        return new RandomDie(numSides || 6)
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