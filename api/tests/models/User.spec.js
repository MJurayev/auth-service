const { User } = require("../../src/models/Users");
const jwt = require('jsonwebtoken')
const config = require('config');
describe('User - generateAuthToken', () => {
    it('should be return valid JWT', ()=>{
        const payload ={
            phone:"+998996672106",
            isVerified:true
        }
        const user = new User(payload)
        const token = user.generateAuthToken()
        const decoded = jwt.verify(token, config.get('JWT_SECRET'))
        expect(decoded).toMatchObject(payload)
    })
});
