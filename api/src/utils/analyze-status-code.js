const isStatusCodeRegex = /^[1-5][0-9][0-9]$/
const failOrSuccessRegex = /^[2][0-9][0-9]$/

const isSuccessCode =(code) =>{
    return new RegExp(failOrSuccessRegex).test(code)
}

module.exports ={ isSuccessCode }