
/**
 * 联合类型，需要写限制代码，遇到类型不支持的操作会报错
 */
/**
 * typeof 类型守护的限制代码
 */
function padLeft(padding: number | string, input: string) {
    // 使用 typeof 的返回值判断类型，叫做类型守护 type guard, narrow types
    if (typeof padding === "number") {
        return new Array(padding + 1).join(" ") + input;
    }
    return padding + input;
}


// typeof 类型守护，返回的值如下：
"string"
"number"
"bigint"
"boolean"
"symbol"
"undefined"
"object"
"function"

// typeof array, typeof null 返回的都是 "object"
/*
function printAll(strs: string | string[] | null) {
    if (typeof strs === "object") {
        for (const s of strs) { // null 不支持这个，但竟然没报错？？？
            console.log(s);
        }
    } else if (typeof strs === "string") {
        console.log(strs);
    } else {
        // do nothing
    }
}
*/

// printAll(null);


/**
 * Truthiness narrowing 真值检测的限制代码
 */
// if 的值始终会被转换为布尔值
/*
0
NaN
"" // (the empty string)
0n // (the bigint version of zero)
null
undefined
*/

// 使用 Boolean() 和 !! 来强制 coerce 将值转换为布尔值
// double negation !! coerce 转换布尔字面量
Boolean("hello") // true
!!"world" // type: true, value: true

// 使用 truthiness 来过滤 null 和 undefined
function printAllSecure(strs: string | string[] | null) {
    if (strs && typeof strs === "object") {
        for (const s of strs) {
            console.log(s);
        }
    } else if (typeof strs === "string") {
        console.log(strs)
    }
}
printAllSecure("hello");
printAllSecure(null);

// Boolean negations with ! filter out from negated branches
function multiplyAll(
    values: number[] | undefined,
    factor: number
): number[] | undefined {
    if (!values) {
        return values;
    } else {
        return values.map(x => x * factor)
    }
}
console.log("hello", multiplyAll([4, 5, 6], 3))
console.log("hello", multiplyAll(undefined, 3))


/** 
 * Equality narrowing
 */
// ==, !==, ==, and != 的类型限制
function equalityExample(x: string | number, y: string | boolean) {
    if (x === y) {
        // x, y both is string 
        x.toUpperCase()
        y.toLowerCase()
    } else {
        console.log(x) // x: string | number
        console.log(y) // y: string | number
    }
}
equalityExample(45, true)

// 非严格比较 == 和 != 可以用来检测值是否是 null 和 undefined
interface Container {
    value: number | null | undefined;
}
function multipleValue(container: Container, factor: number) {
    // narrowing, without null and undefined
    if (container.value == null) {
        console.log(container.value)
    } else {
        // container.value 
        container.value *= factor
    }
}


/**
 * The in operator narrowing
 */
// in 可以检测对象是否存在某个属性，不同的分支，不同的表现
type Fish = { swim: () => void, name: string };
type Bird = { fly: () => void, name: string };
type Human = { swim?: () => void; fly?: () => void };
function move(animal: Fish | Bird) { // | Human
    if ("swim" in animal) {
        return animal.swim() // Fish | Human
    }

    return animal.fly() // Bird | Human
}

let bird: Bird = {
    fly: () => console.log("I'm bird"),
    name: "bird",
}
let fish: Fish = {
    swim: () => console.log("I'm fish"),
    name: "fish",
}
move(bird)
move(fish)

/** 
 * instanceof narrowing 
 */
// instanceof 检测一个值是否是另一个值的实例，值的prototype chian 是否有该类的原型
function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString()); // x: Date
    } else {
        console.log(x.toUpperCase()); // x: string
    }
}
logValue(new Date)
logValue("new Date")

/**
 * Assignments
 */
// 对变量赋值时，ts将会根据值来限制变量的类型
// 下面的x根据值，被推断为联合类型 x: string | number
let x = Math.random() < 0.5 ? 10 : "hello world"
x = 1
x = "goodbye!"
// x = false // 赋值失败


/**
 * Control flow analysis 
 */
// padding: number | string
// if (typeof padding === "number") {
// 这里的 padding 为 number 类型
// }
// 这里的为string类型
// 这种就是ts的控制流分析，根据if和赋值，来动态限制类型
function controlFlowAnalysis() {
    let x: string | number | boolean
    x = Math.random() < 0.5
    console.log(x) // x: boolean

    if (Math.random() < 0.5) {
        x = "hello"
        console.log(x) // x: string
    } else {
        x = 100
        console.log(x) // x: number
    }
    return x; // x: string | number
}

/**
 * Using type predicates
 */
// user-defined type guard, 类型谓词
// parameterName is Type 参数必须是来自函数的签名的参数

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined
}

let pet = Math.random() < 0.5 ? bird : fish
if (isFish(pet)) {
    pet.swim()
} else {
    pet.fly()
}

// 使用自定义类型后卫在 Array.filter 中，获取纯类型的数组
function getSmallPet() {
    return Math.random() < 0.5 ? bird : fish
}
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish)
const underWater2: Fish[] = zoo.filter(isFish) as Fish[]
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
    if (pet.name === "sharkey") return false;
    return isFish(pet)
})

// 类可以使用 this is Type 来作为限制谓语


/**
 * Discriminated unions 区分联合类型
 */
// 限制处理复杂的类型
interface Shape {
    kind: "circle" | "square";
    radius?: number;
    sideLength?: number;
}

function handleShape(shape: Shape) {
    // if (shape.kind === "rect") {
    // 条件永远返回 false，错误的代码
    // }
}

/*
function getArea(shape: Shape) {
    // 有可能返回 undefined，
    return Math.PI * shape.radius ** 2; // Object is possibly 'undefined'
}
*/
// 添加类型检测，以及非空断言
function getArea(shape: Shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius! ** 2;
    }
}

interface Circle {
    kind: "circle";
    radius: number;
}
interface Square {
    kind: "square";
    sideLength: number;
}
type ShapeAgain = Circle | Square;

function getAreaAgain(shape: ShapeAgain) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    }
}

function getAreaSmart(shape: ShapeAgain) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}

/**
 * The never type
 */
// 穷举检测，遇到不会发生的路径，可以分配 never 类型
function getAreaNever(shape: ShapeAgain) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            const exhaustiveCheck: never = shape;
            return exhaustiveCheck;
    }
}

interface Triangle {
    kind: "triangle";
    sideLength: number;
}

type ShapeThree = Circle | Square | Triangle;

function getAreaThree(shape: ShapeThree) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
        // const _exhaustiveCheck: never = shape; // 可以达到的分支，不能使用 never
        // return _exhaustiveCheck;
    }
}