
/**
 * 联合类型，需要写限制代码，遇到类型不支持的操作会报错
 */
function padLeft(padding: number | string, input: string) {
    if (typeof padding === "number") {
        return new Array(padding + 1).join(" ") + input;
    }
    return padding + input;
}

