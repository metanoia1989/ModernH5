// 声明类型
let helloWorld = "Hello World";


// 给对象声明接口约束
interface User {
    name: string;
    id: number;
}
const user: User = {
    name: "Hayes",
    id: 0,
}

// 使用接口来定义类
class UserAcount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}
const userA: User = new UserAcount("Murphy", 1);

// 使用接口注解函数返回类型或者参数类型
function getAdminUser(): User {
    return { name: "admin", id: 1 };
}
function deleteUser(user: User) {

}