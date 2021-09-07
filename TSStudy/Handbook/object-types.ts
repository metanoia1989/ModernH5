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
