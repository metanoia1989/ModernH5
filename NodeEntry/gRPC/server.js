const grpc = require('@grpc/grpc-js')
const hello_proto = require('./proto')

let cnt = 1

// service method 里的两个参数有点类似 express 中 handler 的两个参数： req 和 res。
// 有点像钩子，只负责把response.message返回，实际执行在客户端，client.sayHello({ message: 'Hello' }, function(err, response)
function sayHello(call, callback) {
    callback(null, { message: `[${cnt++}] echo: ` + call.request.message })
}

function main() {
    var server = new grpc.Server()
    server.addService(hello_proto.Greeter.service, { sayHello: sayHello })
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start()
        console.log('grpc server started')
    })
}

main()