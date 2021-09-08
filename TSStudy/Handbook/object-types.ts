/**
 * 将数据组织在一起为对象是基础的方法，ts中通过 object 类型
 */
// anonymous 对象
function greet(person: { name: string; age: number }) {
    return "Hello " + person.name
}

// 也可以使用interface命名
interface Person {
    name: string;
    age: number;
}
function greetAgain(person: Person) {
    return "Hello " + person.name
}

// 或者使用 type alias 
type PersonAlias = {
    name: string;
    age: number;
}
function greetAlias(person: Person) {
    return "Hello " + person.name
}


/**
 * Property Modifiers
 */
// 属性必须指定类型，以及是否可选，使用 `?` 标注属性可选
interface MyShape {
    name: string; 
}
interface PaintOptions {
    shape: MyShape;
    xPos?: number;
    yPos?: number;
}
function getShape(): MyShape {
    return { name: "rect" }
}
function paintShape(opts: PaintOptions) {
    let xPost = opts.xPos // number | undefined
    let yPost = opts.xPos // number | undefined
}
const shape = getShape()
paintShape({ shape })
paintShape({ shape, xPos: 100 })
paintShape({ shape, xPos: 100, yPos: 100 })

// 可选值更好的方式是给定默认值
function paintShapePrefect({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos)
    console.log("y coordinate at", yPos)
}

// readonly 属性，一旦声明赋值，则运行时不可写入改变
interface SomeType {
    readonly prop: string;
}
function doSomething(obj: SomeType) {
    console.log(`prop has the value '${obj.prop}'.`)
    // obj.prop = "hello"; // 不能再赋值了
}
// readonly 只意味着属性不可变，并不意味属性内部不可变，像对象和数组
interface Home {
    readonly resident: { name: string; age: number }
}
function visitForBirthday(home: Home) {
    console.log(`Happy birthday ${home.resident.name}`)
    home.resident.age++
}
function evict(home: Home) {
    home.resident = { // Cannot assign to 'resident' because it is a read-only property.
        name: "Victor the Evictor",
        age: 42
    }
}