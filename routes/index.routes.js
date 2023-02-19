const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.sendFile('index')
})

router.use('/characters', require('./characters.route'))

module.exports = router
