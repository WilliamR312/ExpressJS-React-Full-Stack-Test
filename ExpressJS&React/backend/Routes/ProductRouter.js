const ensureAuthenticated = require('../Middlewares/Auth')

const router = require('express').Router()

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('---- logged in user detail ----', req.user)
    res.status(200).json([
        {
            name  : "test",
            price: 10000
        },
        {
            name  : "clone",
            price: 10000
        }
    ])
})

module.exports = router