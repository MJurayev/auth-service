const { getAnyTime } = require('../../src/utils/Times')

describe('getAnyTime', () => {
    it('Number qaytarish kerak', () => {
        expect(typeof getAnyTime()).toBe(typeof 3000)
    })

    it('1000 sekund keyingi vaqtni olish', () => {
        expect(getAnyTime(3)).toBeCloseTo(Date.now() + 3000,-3)
    })
    
    it('Error qaytarish', () => {
        expect(()=>{getAnyTime(true)}).toThrow(/number/gi)
    })
});
