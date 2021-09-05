/**
 * 依赖  graphQL
 */
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

// 运行 GraphQL query `{ hello }` 然后打印响应
graphql(schema, '{ hello }', root).then(res => {
    console.log("响应值为：", res)
})