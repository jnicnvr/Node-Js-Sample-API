var express = require('express')
var router = express.Router();
const { login, register, auth_user } = require('../app/Controllers/AuthController.js')

router.get('/user', auth_user)
router.post('/login', login)
router.post('/register', register)

module.exports = router;
