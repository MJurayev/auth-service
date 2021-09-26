const router = require('express').Router()

const  { UserPost , UserPut, UserGetAll, UserDelete } = require('../controllers/UserController')
const auth = require('../middleware/auth')
router.use(auth)
router.get('/',async (req, res) => {
        const response = await UserGetAll()
        res.status(response.status).header(response.headers).send(response.body)
})

router.post('/',async (req, res) => {
        const response = await UserPost(req.body)
        res.status(response.status).header(response.headers).send(response.body)
})

router.put('/:id', async (req, res) => {
        const response = await UserPut(req.params.id,req.body)
        res.status(response.status).header(response.headers).send(response.body)
})

router.delete('/:id',async (req, res) => {
        const response =await UserDelete(req.params.id)
        res.status(response.status).header(response.headers).send(response.body)
})

module.exports = router