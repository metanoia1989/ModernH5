// 组合类型：Unions, Generics

// Unions 组合，枚举值，结构类型系统
type MyBool = true | false; // 布尔值
// 字符串和数字的字面量
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
// 联合类型也可以用于函数参数
function getLength(obj: string | string[]) {

}
// 返回不同的类型
function wrapInArray(obj: string | string[]) {
    if (typeof obj === "string") {
        return [obj];
    }
    return obj;
}

// Generic 描述容器类型，或者某种特性的类型
type StringArray = Array<string>;
type NumberArray = Array<string>;
type ObjectWithNameArray = Array<{ name: string }>;
// 声明自己的类型
interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

declare const backpack: Backpack<string>;
const object = backpack.get()
console.log(object)