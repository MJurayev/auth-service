const { isSuccessCode } = require("../../src/utils/analyze-status-code");

describe('isSuccessCode', () => {
    
    it("Should be return true for 2xx status codes", () => {
        expect(isSuccessCode(200)).toBe(true)
    })
    
    it("Should be return true  for  not 2xx status codes", () => {
        expect(isSuccessCode(199)).toBe(false)
        expect(isSuccessCode(300)).toBe(false)
    })
});

