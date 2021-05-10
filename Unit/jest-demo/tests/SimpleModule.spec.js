import { simpleFunc } from "../src/simpleModule"

describe("A simple module", () => {
    test("it should say hello", () => {
        expect(simpleFunc()).toEqual("hello!")
    })
})