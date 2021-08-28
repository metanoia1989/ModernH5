//**************************************** 
// TypeScript 常用类型描述
//**************************************** 

// JavaScript 原始类型 string number boolean
// 数组类型 Array, 声明 number[], Array<number>
// any 任意类型，无需类型检测
let obj: any = { x: 0 };
console.log(obj.x)
obj.bar = 100
obj = "hello"
const n: number = obj

/**
 * 变量的类型注解 Type Annotations on Variables
 */
let firstName: string = "Alice"
let secondName = "Alice" // 不声明类型，会被自动推断为值的类型
// secondName = 444 // 报错


/**
 * 函数 Function 
 */
// 参数类型注解
function greet(name: string) {
    console.log("Hello, " + name.toUpperCase() + "!!");
}
// greet(43) // 会报错

// 返回值类型注解，通常不需要显式标注，ts会根据return声明来自动推断
// 注明返回值类型，为了文档、意外的改变、个人的喜好
function getFavoriteNumber(): number {
    return 26;
}

// 匿名函数 Anonymous Functions，参数无需指定类型，ts会根据调用来赋予类型
// 这种方式叫做上下文类型化
const names = ["Alices", "Bob", "Eve"];
names.forEach(s => { // s 被视为字符串类型
    console.log(s.toUpperCase())
})


// 对象类型参数 Object Types
// 定义对象类型，简单的列举其属性和属性类型即可 
// 属性的类型是可选的，不指定的时候，类型为 any 
function printCoord(pt: { x: number; y: number }) {
    console.log("The coordinate's x value is " + pt.x)
    console.log("The coordinate's y value is " + pt.y)
}
printCoord({ x: 3, y: 7 });

// 对象属性可以是可选的，用`?`在其后面标注即可
// 如果访问不存在的属性，会得到 undefined
// 所以要在访问这种可选属性时，进行 property !== undefined 的比较操作
function printName(obj: { first: string; last?: string }) {
    let name = obj.last === undefined ? obj.first : obj.first + " " + obj.last
    console.log("This person is " + name);
}
printName({ first: "Bob" })
printName({ first: "Alice", last: "Alisson" })


/**
 * 联合类型 Union Types
 */
function printId(id: number | string) {
    console.log("Your ID is: " + id)
}
printId(101)
printId("202")

// narrow 处理联合类型的值，需要编写限制代码
function printIdStrict(id: number | string) {
    if (typeof id === "string") {
        // 这里可以把 id 视作字符串类型
        console.log("string", id.toUpperCase())
    } else {
        // 这里是 number 类型
        console.log("number", id * 2)
    }
}
printIdStrict(101)
printIdStrict("202")

function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
        // x 是 string[] 字符串数组
        console.log("Hello, " + x.join(" and "))
    } else {
        // x 是 string
        console.log("Welcome lone traveler " + x)
    }
}
welcomePeople(["Ana", "Adam", "Lucy"])
welcomePeople("Joe")
// 联合类型的每个类型都用通用的属性，这时不需要写限制代码
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3)
}
console.log(getFirstThree([115, 114, 113, 2, 4]))
console.log(getFirstThree("金刚葫芦娃"))


/**
 * 类型别名 Type Alias
 */
// 使用 type 关键字来声明类型别名
type Point = {
    x: number;
    y: number;
}
function printCoordSame(pt: Point) {
    printCoord(pt)
}
printCoordSame({ x: 100, y: 100})

// 联合类型的别名
type ID = number | string;

// 别名仅仅是别名，是一种语法糖；同一个类型的不同别名，类型是相同的
type UserInputSanitizedString = string;
function sanitizeInput(str: string): UserInputSanitizedString {
    return str.trim()
}
let userInput = sanitizeInput(" hello ");
userInput = "new input" // 并不报错



/** 
 * 接口 Interfaces 
 */
// 声明对象的另一种方法
// 只要对象拥有接口定义的属性，则是符合这个接口
// 这叫做 TS 结构化类型系统
interface PointInterface {
    x: number; 
    y: number;
}

// 类型别名和接口的区别：类型不能添加新的属性，接口可以被扩展
// 扩展类型通过交集运算
type Animal = {
    name: string;
}
type Bear = Animal & {
    honey: boolean;
}

type MyWindow = {
    title: string;
}
// type MyWindow = {
//     ts: CallableFunction
// }
// 接口类型通过继承，也可以直接扩展
interface AnimalInterface {
    name: string;
}
interface BearInterface extends AnimalInterface {
    honey: boolean;
}
interface WindowInterface {
    title: string
}
interface WindowInterface {
    ts: CallableFunction
}



/** 
 * 类型断言 Type Assertions
 */
// 有时候没有一个值的类型信息，可以使用类型断言来指定详细的类型
// 类型断言使用 `as` 语句
// const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// tsx 即 react 的特殊语法
// const myCanvas2 = <HTMLCanvasElement>document.getElementById('main_canvas');
// 断言的特殊类型 any unkonwn
// const a = (expr as any) as T;


/** 
 * 字面量类型 Literal Type
 */
// 将原始类型赋值给const变量，则视作字面量类型
const constantString = "Hello World";
constantString // const constString: "Hello World"
// 字面量类型不允许修改
let constX: "hello" = "hello"
// x = "how dy" // 报错

// 字面量类型可以作为联合类型
function printText(s: string, alignment: "left" | "right" | "center") {
    //....
}
printText("Hello, world", "left")

function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
}

// 也可以联合字面量类型和非字面量类型
interface Options {
    width: number;
}

function configure(x: Options | "auto") {
    // ...
}
configure({ width: 100 });
configure("auto")

// const 对象的属性是可以修改的，利用字面量类型断言，强制其不可修改
const req = { 
    url: "https://exmaple.com",
    method: "GET" as "GET"
}
function handleReuqest(url: string, method: "GET") {
    console.log(url, method)
}
handleReuqest(req.url, req.method)

// 使用 as const 断言，将整个对象转换为 type literals
const req2 = { url: "https://example.com", method: "GET" } as const;
handleReuqest(req2.url, req2.method);


/**
 * null 和 undefined 
 */
// 这两个都是 JavaScript 原始值，表示值缺失和变量未定义
let undef
console.log(undef)

// TypeScript 使用 ! 来严格检测 null 和 undefined，而不需要任何检测
function liveDangerously(x?: number | null) {
    console.log(x!.toFixed());
    console.log("hello")
}
// liveDangerously() // 通不过类型检查


/**
 * Enums 枚举值，一些常量值的集合
 */



/**
 * Other Primitives - BigNum Symbol
 */
const oneHundred: bigint = BigInt(100);
const anotherHundred: bigint = 100n;

const whoName = Symbol("Adam");
const whereName = Symbol("Adam");
console.log('whoName == whereName') 
// console.log(whoName == whereName ? true : false)
