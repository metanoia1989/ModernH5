// 连接 test 测试数据库
const mongoose = require('mongoose')

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test')
    console.log("连接MongoDB成功")

    // 创建 Schema
    const kittySchema = new mongoose.Schema({
        name: String
    })
    kittySchema.methods.speak = function speak() {
        const greeting = this.name 
            ? "Meow name is " + this.name
            : "I don't have a name"
        console.log(greeting)
    }
    // 注册 Schema 到模型
    // 模型用来构造文档，每个文档的属性和行为都定义在Schema中
    const Kitten = mongoose.model('Kitten', kittySchema)

    // 创建一个文档
    const silence = new Kitten({ name: 'Silence' })
    console.log("这个猫的名字为：", silence.name)

    const fluffy = new Kitten({ name: 'fluffy' })
    fluffy.speak() // 调用schema方法

    // 保存文档到数据库
    await silence.save()
    await fluffy.save()

    // 通过模型查询文档
    const kittens = await Kitten.find()
    console.log("所有的kittens->", kittens)
}