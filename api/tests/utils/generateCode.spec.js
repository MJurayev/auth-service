const { generateCode } = require("../../src/utils/generateCode");
describe('generateCode', () => {
    
    it("Should be return length of string 5", () => {
        expect(generateCode().length).toBe(5)
    })

    it("Should be return length of string 10", () => {
        expect(generateCode(10).length).toBe(10)
    })

    it("Should be return null ", () => {
        expect(generateCode(3)).toBe(null)
    })
});
