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
}
// fetchSomeObject(SomeObjectFunc)