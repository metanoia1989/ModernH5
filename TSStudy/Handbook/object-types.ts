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


// The Array Type，泛型对象经常用于容器类型元素的排序，处理数据结构的方式可以对不同的类型复用   
// number[] or string[] 是 Array<number>, Array<string> 的简写  

function doSomethingAgain(value: Array<string>) {
    //...
}

let myArr: string[] = ["hello", "world"];
doSomethingAgain(myArr);
doSomethingAgain(new Array("hello", "world"))

// Array 本身就是一种泛型
interface MyArray<Type> {
    /**
     * 获取数组的长度
     */
    length: number;
    
    /**
     * 移除数组的最后一个元素，并且返回它
     */
    pop(): Type | undefined;
    
    /**
     * 追加新的元素到数组中，返回数组的新长度   
     *
     * @param items 要追加的元素
     */
    push(...items: Type[]): number;
}

// 现代 JavaScript 也提供了其他数据结构的泛型，像 Map<K, V>, Set<T>, Promise<T>，有着Map,Set,Promise的行为表现  

// The ReadonlyArray Type 不可变数组
// ReadonlyArray 没有构造函数，但是可以用普通数组进行赋值
function doStuff(values: ReadonlyArray<string>) {
    const copy = values.slice()
    console.log(`This first value is ${values[0]}`)
    
    // values.push("hello!"); // 不允许修改
}

doStuff(["hello", "world"])

// TS 为Array<Type> 提供简写 Type[]，为ReadonlyArray<Type> 提供简写 readonly Type[]
function doStuffAgain(values: readonly string[]) {
    const copy = values.slice()
    console.log(`This first value is ${values[0]}`)
    
    // values.push("hello!"); // 不允许修改
}
// readonly string[] 无法再赋值给 string[]


// Tuple Types 
// 是知道元素数量的可排序数组类型
type StringNumberPair = [string, number];
function doSomethingWithPair(pair: [string, number]) {
    const a = pair[0]; 
    const b = pair[1]; 
    console.log(typeof a, typeof b)
}
doSomethingWithPair(["hello", 42])

// pair 等同于声明了数组长度属性和指定索引的属性属性类型
interface StringNumberPairInterface {
    length: 2;
    0: string;
    1: number;
    
    // Other Array<string | number> members
    slice(start?: number, end?: number): Array<string | number>;
}

// tuple 也可以声明可选类型 
type Either2dOr3d = [ number, number, number?];
function setCoordinate(coord: Either2dOr3d) {
    const [x, y, z] = coord; // z -> number | undefined
    console.log(`Provided coordinates has ${coord.length} dimensions`)
    // property length: 2 | 3
}
// tuple 中也可以使用 rest elements 
type StringNumberBooleans = [string, number, ...boolean[]]
type StringBooleansNumber = [string, ...boolean[], number]
type BooleansStringNumber = [...boolean[], string, number]
// rest elemtns 的 tuple 没有 length 属性
// rest elements 数组，只知道类型位置，无法推断 length
const a1: StringNumberBooleans = ["hello", 1];
const b1: StringNumberBooleans = ["beautiful", 2, true]
const c1: StringNumberBooleans = ["world", 3, true, false, true, false, true]

// rest elements 的可能用处
function readButtonInput(...args: [string, number, ...boolean[]]) {
    const [ name, vaersion, ...input ] = args;
}
// equivalent to
function readButtonInputAgain(name: string, version: number, ...input: boolean[]) {
    //...
}


// readonly Tuple Types
function doSomethingReadonlyTuple(pair: readonly [string, number]) {
    // ...
    // pair[0] = "hello"; // Cannot assign to '0' because it is a read-only property. 
}
// 或者断言为 const 类型，也能被推断为 readonly 属性
let point = [3, 4] as const;
function distanceFromOrigin([x, y]: [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2)
}
// Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
// 只读 tuple 不能赋值给 [number, number]
// distanceFromOrigin 预期的是一个 mutable tuple 
// console.log(distanceFromOrigin(point))