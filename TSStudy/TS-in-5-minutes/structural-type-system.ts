// 结构化类型系统，类似go的interface，只要方法一致的结构体，就视作实现了该接口
// ts这里，只要对象的属性与接口定义的一致，就视作为该接口

interface Point {
    x: number;
    y: number;
}

function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

const point = { x: 12, y: 26 };
logPoint(point)