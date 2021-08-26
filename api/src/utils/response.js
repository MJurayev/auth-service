const makeResponse = (status, body, headers) => {
    return {
        status:status,
        body:body,
        headers:headers
    }
}

module.exports = { makeResponse }