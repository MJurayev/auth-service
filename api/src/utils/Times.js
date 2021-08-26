const getAnyTime =( seconds=0)=>{
    const now =Date.now()
    const expires = now+seconds*1000
    return expires
}
module.exports = { getAnyTime }