const getAnyTime =( seconds=0)=>{
    if(typeof seconds !== "number")
         throw new Error("second is must be number")
    const now =Date.now()
    const expires = now+seconds*1000
    return expires
}
module.exports = { getAnyTime }