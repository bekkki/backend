const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()
router.get('/', (req, res) => {
    res.send('hello beki')

})
router.get('/dashboard', (req, res) => {
    res.send('this is the dash board')

})
router.post('/adduser', actions.addNew)
router.post('/authenticate', actions.authenticate)
router.get('/getinfo', actions.getinfo)
router.get('/getposts', actions.getposts)
module.exports = router