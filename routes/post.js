var express = require('express')
var router = express.Router();
const verify = require('../routes/verifyToken')

router.get('/post',verify, function(req, res){
    // console.log(req.query)
    res.send('oh yeah')
})

module.exports = router;
