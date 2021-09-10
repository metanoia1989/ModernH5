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
    // home.resident = { // Cannot assign to 'resident' because it is a read-only property.
    //     name: "Victor the Evictor",
    //     age: 42
    // }
}

// 只读类型可以通过别名修改
interface Person {
    name: string;
    age: number;
}
interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}
let writablePerson: Person = {
    name: "Person McPersonface",
    age: 42,
}
let readonlyPerson: ReadonlyPerson = writablePerson
console.log("readonlyPerson.age->", readonlyPerson.age)
// readonlyPerson.age++ // 并不能修改，文档是错误的
// console.log("readonlyPerson.age->", readonlyPerson.age)

// Index Signatures 有时候不知道类型的属性，但是知道属性的形状
// 可以用这个形状来检索属性
interface MyStringArray {
    [index: number]: string;
}
const myArray: MyStringArray = ["t555", "t387", "t444"]
const secondItem = myArray[1]; // 索引为数字，返回类型为字符串
// 索引属性的类型必须是数字或者字符串

interface AnimalGood { name: string; };
interface Dog  extends AnimalGood { breed: string;}
// number 和 string 不能同时作为索引类型
interface NotOkay {
    // [x: number]: AnimalGood;
    [y: string]: Dog;
}

interface NumberDictionary {
    [index: string]: number;
    length: number;
    // name: string; // 索引类型跟同类型属性不兼容
}

// 索引信号是联合类型属性
interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number;
    name: string;
}

// 也可以指定 readonly 给索引属性
// 对这个有点疑惑不见，没有很懂哈哈哈
interface ReadonlyStringArray {
    readonly [index: number]: string
}
let myStringArray: ReadonlyStringArray = ["hello", "world"]
// myStringArray[2] = "wo" // Index signature in type 'ReadonlyStringArray' only permits reading. 


/**
 * Extending Types 扩展类型
 */
interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}
// 使用 extends 来扩展接口
interface AddressWithUnit extends BasicAddress {
    unit: string;
}
// interface 可以 extends 多个
interface Colorful {
    color: string;
}
interface CircleMe {
    radius: number;
}
interface ColorfulCircle extends Colorful, CircleMe {}
let cColorCircle: ColorfulCircle = {
    color: "red",
    radius: 42,
}

/**
 * Intersection Types  
 */
// 使用 & 来交叉已存在的多个类型   有点类似类型别名的感觉
type AnotherColorfulCircle = Colorful & CircleMe
function draw(circle: Colorful & CircleMe) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`)
}
draw({ color: "blue", radius: 42 });
draw({ color: "red", radius: 42 });
// { color: string; radisu: number } 跟 Colorful & CircleMe 不兼容
// 前者类似对象字面量，有自己的属性 

/**
 * Gneric Object Type 通用对象类型，泛型
 */
interface Box {
    contents: unknown;
}

let xMe: Box = {
    contents: "Hello World"
}
// 检测 xMe.contents 的类型，避免发生错误
if (typeof xMe.contents === 'string') {
    console.log(xMe.contents.toLowerCase())
}
// 进行类型断言
console.log((xMe.contents as string).toLowerCase())

// 替换不同 contents 为不同的骨架类型
interface NumberBox {
    contents: number;
}
interface StringBox {
    contents: string;
}
interface BooleanBox {
    contents: boolean;
}
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: string): void;
function setContents(box: BooleanBox, newContents: string): void;
function setContents(box: { contents: any }, newContents: any) {
    box.contents = newContents;
}
// 太多 boilerplate 代码，如果要添加新的类型，就要再写一个函数签名
// 指定一个类型参数
interface BoxMe<Type> {
    contents: Type;
}
let box: BoxMe<string> = { contents: "hello" }
interface Apple {}
type AppleBox = BoxMe<Apple>

function setContentsGenric<Type>(box: BoxMe<Type>, newContents: Type) {
    box.contents = newContents;
}

// 泛型代码，可以用类型别名
type BoxTwo<Type> = {
    contents: Type;
}