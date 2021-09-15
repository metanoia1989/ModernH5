/**
 * Generic -  Types which take parameters 参数类型化
 */
// 软件工程师构建的组件不仅有良好、一致的API，而且是可复用的。
// 组件既能处理今天的数据，也能处理明天的数据，会给构建大型系统带来最大的灵活性。   
// 像C#和Java，工具箱中主要的工具就是创建可复用组件的泛型，可以创建适用各种类型的组件而不是单一类型。
// 允许消费这些组件，并且使用自己的类型。

/**
 * Hello World of Generics
 */
// 缺点，返回值将会丢失类型信息
function identityAny(arg: any): any {
    return arg;
}
// 使用类型变量
function identity<Type>(arg: Type): Type {
    return arg;
}
let output = identity<string>("myString")
// 编译器类型推断
let outInference = identity("myString")
// 类型复杂时，或者编译器类型推断失败时，需要 explicity 指定类型

/**
 * Working with Generic Type Variables
 */
// 限定泛型的属性
function loggingIdentity<Type>(arg: Type[]): Type[] {
    console.log("参数的长度是多少？", arg.length)
    return arg
}

/**
 * Generic Types
 */
// 泛型函数，以及泛型接口
// 泛型函数类似函数定义，有参数列表
let myIdentity: <Type>(arg: Type) => Type = identity;
let inputIentity: <Input>(arg: Input) => Input = identity;

// 将泛型看做对象字面量的调用信号
let callIdentity: { <Type>(arg: Type): Type } = identity;

// 泛型接口，仅一个成员，函数类型
interface GenericIdentityFn {
    <Type>(arg: Type): Type;
}
let interIdentity: GenericIdentityFn = identity;

// 将类型参数移动到泛型接口上，对所有成员生效
interface GenericIdentityTypeFn<Type> {
    (arg: Type): Type;
}
let typeIdentity: GenericIdentityTypeFn<number> = identity;