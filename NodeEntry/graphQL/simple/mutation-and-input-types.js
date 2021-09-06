/**
 * 依赖 graphql, express-graphql, express
 */
var express = require('express')
var { graphqlHTTP } = require('express-graphql')
var { buildSchema } = require('graphql')

// *****************************************************
// Input 类型的字段只能是标量字段，不能是对象
//******************************************************

// 构造 schame
var schema = buildSchema(`
    input MessageInput {
        content: String
        author: String
    }
    
    type Message {
        id: ID!
        content: String
        author: String
    }
    
    type Query {
        getMessage(id: ID!): Message
    }
    
    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }
`)

class Message {
    constructor(id, { content, author }) {
        this.id = id
        this.content = content 
        this.author = author
    }
}

// Maps username to content
var fakeDatabase = {}

// root provider 提供每一个API endpoint 的 resolver
var root = {
    getMessage: ({ id }) => {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id)
        }
        return new Message(id, fakeDatabase[id])
    },
    createMessage: ({input}) => {
        var id = require('crypto').randomBytes(10).toString('hex')
        fakeDatabase[id] = input
        return new Message(id, input)
    },
    updateMessage: ({ id, input }) => {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id)
        }
        fakeDatabase[id] = input 
        return new Message(id, input)
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