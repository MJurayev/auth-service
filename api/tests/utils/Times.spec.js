const { getAnyTime } = require('../../src/utils/Times')

describe('getAnyTime', () => {
    it('1000 sekund keyingi vaqtni olish', () => {
        expect(getAnyTime(3)).toBeCloseTo(Date.now() + 3000,-3)
    })
});
