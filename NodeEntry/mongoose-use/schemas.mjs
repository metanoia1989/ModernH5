/**
 * Defining your schema
 */
// 每个schema映射collection，定义document的形状
import mongoose from 'mongoose'

const { Schema } = mongoose;

(async () => {
    await mongoose.connect('mongodb://localhost:27017/test')
    console.log("连接MongoDB成功")

    const blogSchema = new Schema({
        title: String, // 等同于 { type: String }
        author: String,
        body: String,
        comments: [{ body: String, date: Date }],
        date: { type: Date, default: Date.now },
        hidden: Boolean,
        meta: {
            votes: Number,
            favs: Number,
        }
    })
    // 还可以使用 Schema.add 添加额外的字段
    // 每个属性都关联 SchemaType，允许的 SchemaType 类型如下
    // String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map
    // Schema 可以定义属性、文档实例方法、静态模型方法、复合索引、文档生命周期钩子即中间件

    /**
     * Creating a model
     */
    const Blog = mongoose.model('Blog', blogSchema)

    /**
     * Ids
     */
    // schema 默认会被添加 _id 属性
    const schema = new Schema()
    schema.path('_id') // ObjectId { ... }

    // _id 的类型为 ObjectId
    const Model = mongoose.model('Test', schema)
    const doc = new Model
    console.log(doc._id instanceof mongoose.Types.ObjectId);

    // mongodb的所有document必须有_id 字段
    // 自己指定 _id 字段
    const schemaMyId = new Schema({ _id: Number })
    const ModelMyId = mongoose.model('schemaMyId', schemaMyId)
    const doc2 = new ModelMyId
    doc2._id = 1
    await doc2.save()
    
})()