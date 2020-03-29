var t : number = 1;

var b : boolean = false;

if (t) {
    console.log("hello");
}

function sume(a: number, b: number, callback: (result: number) => void) {
    callback(a + b);
}

class Character {
    fullname: string;
    constructor(firstname: string, lastname: string) {
        this.fullname = firstname + lastname;
    }
    greet(name?: string) {
        if (name) {
            return "Hi! " + name + "! my name is " + this.fullname;
        } else {
            return "Hi! my name is " + this.fullname;
        }
    }
}

var spark = new Character("Jacob", "Keyes");
var msg = spark.greet();
console.log(msg);
var msg1 = spark.greet("Dr. Halsey");
console.log(msg1);

// 接口约束对象
interface LoggerInterface {
    log(arg: any): void;
}

class Logger implements LoggerInterface {
    log(arg) {
        if (typeof console.log === "function") {
            console.log(arg);
        } else {
            alert(arg);
        }
    }
}

// 接口约束对象字面量
interface UserInterface {
    name: string;
    password: string;
}
var user: UserInterface = {
    name: "",
    password: "",
};

// 命名空间
namespace Geometry {
    interface VectorInterface {}
    export interface Vector2dInterface {}
    export interface Vector3dInterface {}
    export class Vector2d implements VectorInterface, Vector2dInterface {}
    export class Vector3d implements VectorInterface, Vector3dInterface {}
}

var Vector2dInstance: Geometry.Vector2dInterface = new Geometry.Vector2d();
var Vector3dInstance: Geometry.Vector3dInterface = new Geometry.Vector3d();

