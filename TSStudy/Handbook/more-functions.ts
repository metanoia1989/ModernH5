/**
 * 这个是关于函数类型的练习
 * https://www.typescriptlang.org/docs/handbook/2/functions.html 
 */
 
/**
 * Function Type Expressions
 */
// 函数类型表达式，类似箭头函数
function greeter(fn: (a: string) => void) {
    fn("Hello World")
}
function printToConsole(s: string) {
    console.log(s)
}
greeter(printToConsole)
// (a: string) => void 是函数类型声明，字符串参数，没有返回值
// 函数参数没有指定类型时，会隐式地声明为any

// 为函数类型声明别名
type GreetFunction = (a: string) => void;
function greeterV2(fn: GreetFunction) {
    fn("Hello World v2")
}

/**
 * Call Signatures
 */
// JS的函数是允许添加属性的，TS的函数类型表达式不允许，
// 所以需要用调用签名来实现
type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
}
function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6))
}
function printToConsoleV3(a: number) {
    console.log("arg is ", a)
    return a * a  > 10
}
printToConsoleV3.description = "print to console"
doSomething(printToConsoleV3)


// 用 new 关键词添加构造函数签名
interface SomeObject {
    name: string;
}
type SomeContructor = {
    new (s: string): SomeObject;
}
function fetchSomeObject(ctor: SomeContructor) {
    return new ctor("hello");
}
function SomeObjectFunc(name: string) {
    this.name = name;
    console.log("my name is ", this.name)
    // return { name: name }
}
// fetchSomeObject(SomeObjectFunc)

// 类似 Date 对象，即可使用 new，也可以直接调用
interface CallOrConstruct {
    new (s: string): Date,
    (n?: number): number;
}
// 但是这个具体怎么用，我还不是很清楚o
// 

/**
 * Generic Functions
 */
// 泛型，定义不同类型之间的共性
// 编译器根据上下文进行类型推断
function firstElement<Type>(arr: Type[]): Type {
    return arr[0];
}
const s = firstElement(["a", "b", "c"]);
const n1 = firstElement([1, 2, 3])
console.log("调用泛型的函数：", typeof s, typeof n1)

// 多个类型参数的推断
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output) : Output[] {
    return arr.map(func)
}
// parsed => type number[]
const parsed = map(["1", "2", "3"], n => parseInt(n))
console.log(parsed)

// 类型约束，只需要类型的子集操作  type constraint
function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a 
    } else {
        return b
    }
}
const longerArray = longest([1, 2], [1, 2, 3]); // number[]
const longerString = longest("alice", "bob"); // string
// const notOk = longest(10, 100);  
// 这个设计真的非常不错，类似C++20的Concept，但是C++的这些特性来的太晚了
// 而且C++已经成长为一个语法巨无霸了

// Working with Constrained Values  返回T，T受约束，返回值必须为T，而不仅仅符合约束条件
// function minimumLength<Type extends { length: number }> (
//     obj: Type, minimum: number
// ) : Type {
//     return obj.length >= minimum ? obj : { length: minimum }
// }
// const arr = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
// console.log(arr.slice(0));

// Specifying Type Arguments 手动指定类型参数
// 类型推断并不总能推断正确，对于 union 类型需要手动指定
function combine<Type>(arr1: Type[], arr2: Type[]) : Type[] {
    return arr1.concat(arr2);
}
// const arrC = combine([1, 2, 3], ["hello"]);  // string not assignable to type number
const arrB = combine<string|number>([1, 2, 3], ["hello"]);
console.log(arrB);

// Guidelines for Writing Good Generic Functions 好的泛型代码编写指南
// 使用类型约束或者很多类型参数，很少的类型推导也会导致调用出错
// 类型参数向下 Push Type Parameters Down 
function firstElement1<Type>(arr: Type[]) {
    return arr[0];
}
function firstElement2<Type extends any[]>(arr: Type) {
    return arr[0];
}
const fA = firstElement1([1, 2, 3]); // a: number 
const fB = firstElement2([1, 2, 3]); // b: any 糟糕的推导
// 使用更少的类型参数
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean) : Type[] {
    return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[], func: Func 
): Type[] {
    return arr.filter(func);
}
// filter2 让调用者指定额外的类型，并且Func让函数变得难以阅读


// 类型参数应该出现两次 Type Parameters Should Appear Twice
// Generic Type 类型参数是多个值相关的类型，如果仅用一次，就不与任何相关了
function greetBad<Str extends string>(s: Str) {
    console.log("Hello, " + s);
}
greetBad("world")
function greetGood(s: string) {
    console.log("Hello, " + s)
}
greetGood("world")

/**
 * Optional Parameters 可选参数
 */
// TS 的可选参数使用 ? 标注
function optionalParamter(x?: number) {
    //....
}
optionalParamter()
optionalParamter(10)
// 模拟缺失的参数
function optionalParamterTwo(x = 10) {
    //....
}

// Optional Parameters in Callbacks 回调函数中的可选参数
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}
// 回调函数中，第二个参数，索引可选
myForEach([1, 2, 3], a => console.log(a))
myForEach([1, 2, 3], (a, i) => console.log(a, i))


/**
 * Function Overloads 函数重载
 */
// 通过不同的 overload signatures 重载签名来调用函数
// 可以写一些函数签名成员，然后跟着函数体
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3);

// 重载签名需要兼容实现签名
function fn(x: string, y: boolean): void;
// function fn(x: boolean): void; // 不兼容，感觉这样的重载函数最后可以合并成一个，毕竟函数体也只有一个
function fn(x: string): void {

}

// Writing Good Overloads
// 遵循一些指南，可以让重载函数代码更容易调用、理解和实现
// 返回字符串或者数组的kuandu 
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
    return x.length;
}
// len 函数可以用在字符串或者数组上，而不能是两者的联合类型上
len("");
len([0]);
// len(Math.random() > 0.5 ? "hello" : [0]);
// 由于这个函数一样特性的参数和返回值，所以可以直接写一个非重载版本
function lenNoOverload(x: any[] | string) {
    return x.length;
}

/**
 * Declaring this in a Function，说实话，我到现在都没有理解 this 这个关键字
 */
// ts 会根据this所在函数的上下文来进行推断
const userObj = {
    id: 123,
    admin: false,
    becomeAdmin: function() {
        this.admin = true;
    },
    who: function () {
        console.log(`id=${this.id}, admin=${this.admin}`)
    }
}
userObj.becomeAdmin()
userObj.who()
// 高级类型就是生成类型的类型，它除了可以传泛型参数外还可以支持分支、递归、取属性等操作，可以通过复杂的逻辑来生成类型
// 高级类型支持类型编程，甚至是图灵完备的，图灵完备的意思就是说提供的语言特性可以描述所有可计算的逻辑。
// 类型本质上是运行时变量的内存大小和可对它进行的操作，变量只赋值同类型的值就是类型安全，动态类型在源码中没有类型信息，没法保证类型安全，
// 而静态类型则是在源码中有类型信息，可以在编译期间检查出类型的错误，保证类型安全。

// ts 允许声明 this 的类型
// 箭头函数不支持 this 类型参数，箭头函数只会访问全局的this
interface DB {
    // filterUsers(filter: (this: User) => boolean): User[];
}
// const db = getDB();
// const admins = db.filterUsers(function (this: User) {
//     return this.admin;
// })
// 编程设计里有这么多精巧的知识，我都没有去了解学习，蛮悲哀的，陷入重复的码农机器


/**
 * Other Types to Know About 其他已知的类型
 */
// 一些其他的类型，在函数上下文中有特殊的含义
// void 表示函数没有任何返回值，推断函数在任何时候都没有return声明
// 或者没有通过return返回任何显式的值
function noop() { // 推断返回值为 void，跟C有点类似哈哈
    return; 
}
// JS中没有任何返回值，将隐式地返回undefined；在TS中，void和undefined不是一样的东西

// object 类型能够引用任何不是原始类型的值，原始类型如 string number bigint boolean symbol null undefined
// 跟空对象类型 {} 和 全局对象类型 Object 都不同，object is not Object. Always use object!  

// JS中，函数值也是对象，有 Object.prototype 这个属性表示原型链，能够通过 instanceof Object 进行判断。
// 能够调用 Object.keys()，函数类型也被看做是对象。 

// unknown 类型能够表现任何值，类似 any 类型，但是更安全，因为不能合法地对unknown值进行任何操作。   
function f_any(a: any) {
    a.b(); // ok
}
function f_unknown(a: unknown) {
    // a.b(); // Object is of type 'unknown'
}
// unknown 类型参数可以接收任意参数，并且作为返回值也可以是任意类型
function safeParse(s: string): unknown {
    return JSON.parse(s)
}
const obj_s = safeParse('{"key": "value"}');
console.log(obj_s)


// never 一些函数永远不返回一个值
// The never type represents values which are never observed. 
// 作为返回值时，意味着抛出异常或者中断程序执行
function fail(msg: string): never {
    throw new Error(msg);
} 
// never 也表示ts永远也不会达到的分支
function fn_never(x: string | number) {
    if (typeof x === "string") {
        // do something
    } else if (typeof x === "number") {
        // do something else
    } else {
        x; // has type 'never'!
    }
}

// Function 
// 全局类型 Function，有描述属性 bind, call, apply 和其他所有函数值在js中表现一样
// Function类型有特殊的属性，总是能被调用，调用返回 any
// f 没有指定返回值，是危险的，默认为 any，可以显式地指定 () => void
function doSomethingFunction(f: Function) {
    f(1, 2, 3);
}

/**
 * Rest Parameters and Arguments
 */
// 使用 rest 参数，允许然函数接收不定数量的参数
function multiply(n: number, ...m: number[]) {
    return m.map(x => n * x)
}
const a_num = multiply(10, 1, 2, 3, 4, 5)
console.log("multiply(10, 1, 2, 3, 4, 5) => ", a_num)
// ts中，rest 参数默认隐式指定为 any[]
// 显式地指定类型，必须为 Array<T> 或者 T[]，或者一个 tuple 类型

// 相反地，可以使用 ... 从数组中提取可变个参数
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
arr1.push(...arr2)
console.log("[1,2,3].push(...[4, 5, 6]) => ", arr1)
// ...array 会被推断为 Array<T> 而不是多个类型的变量
const args = [8, 5]
// const angle = Math.atan2(...args); // A spread argument must either have a tuple type or be passed to a rest parameter.

// 使用 const 上下文是最好的解决方案
const args2 = [8, 5] as const;
const angle2 = Math.atan2(...args2)


/**
 * Parameter Destructuring 参数解构
 */
// 使用参数解构来解压缩对象
function sum({ a, b, c}: { a: number; b: number; c: number }) {
    console.log(a + b + c)
}
type ABC = { a: number; b: number; c: number };
function sumTo({ a, b, c}: ABC) {
    console.log(a + b + c)
}
sumTo({ a: 44, b: 55, c: 66 })

/**
 * Assignability of Functions
 */
// 可分配的函数
// 上下文推断的返回void并不强制没有返回值，例如 `(type vf = () => void)`
// 具体的实现可以返回任意类型，但是会被忽略
type voidFunc = () => void;
const voidF1: voidFunc = () => {
    return true;
}
const voidF2: voidFunc = () => true
const voidF3: voidFunc = function () {
    return true;
}
console.log("voidF1() => ", voidF1())
console.log("voidF2() => ", voidF2())
console.log("voidF3() => ", voidF3())
const v1 = voidF1(), v2 = voidF2(), v3 = voidF3()
console.log('v1=', v1, ' v2=', v2, ' v3=', v3)
// =_= 调用的结果是都有返回值，但是类型会被忽略 
// 因为这个原因，Array.prototype.forEach 的回调必须为void，但是可以可用push
const src = [1, 2, 3]
const dst = [0]
src.forEach(el => dst.push(el))

// 只有匿名函数可以这样，function 关键字定义的具名函数是不允许的
// 但是没报错==
function f2(): void {
    // @ts-expect-error
    return true;
}
const f3 = function (): void {
    // @ts-expect-error
    return true;
};
   