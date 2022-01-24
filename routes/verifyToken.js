const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) res.status(403).send('Access Denied')
    // console.log(req)
    try {
        const verified = jwt.verify(token, process.env.APP_SECRET_TOKEN,{ expiresIn: 60 * 60 })
        req.user = verified
        console.log(req.user)
        next()
    }
    catch (err) {
        res.status(400).send('Invalid Token')
    }
}
