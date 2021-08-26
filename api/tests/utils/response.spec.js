const { makeResponse } = require("../../src/utils/response")

describe('makeResponse', () => {
    it('Return Response object', () => {
        const headers = [
           { "Content-type":"application/json" }
        ]
        const body = {
            name:"Mansur",
            surname:"Jo'rayev"
        }
        const statusCode = 200
    
        const response = {
            status:200,
            body:{
                name:"Mansur",
                surname:"Jo'rayev"
            },
            headers: [
                { "Content-type":"application/json" }
            ]
        }
        expect(makeResponse(statusCode, body, headers)).toEqual(response)
    })
});
