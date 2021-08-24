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

// 变量的类型注解
let firstName: string = "Alice"
let secondName = "Alice" // 不声明类型，会被自动推断为值的类型
// secondName = 444 // 报错