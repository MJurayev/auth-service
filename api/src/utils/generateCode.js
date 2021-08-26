function generateCode(count=5){
    if(count<=4) return null
    let code="", counter=1;
    while(counter<=count){
        code+=Math.floor((Math.random()*1000)%10).toString()
        counter++
    }
    return code
}

module.exports = { generateCode }