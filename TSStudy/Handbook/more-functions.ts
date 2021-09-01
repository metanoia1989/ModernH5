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
