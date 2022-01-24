var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { genSaltSync, hashSync } = bcrypt
const { login, register, auth_user } = require('../Services/AuthService')
const { loginValidation, registerValidation } = require('../../config/validation');

module.exports = {
    login: (req, res) => {
        const { error } = loginValidation(req.body);
        
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        login (req.body, async (err, results) => {
            
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection errror"
                });
            }
            //email validation
            if(!results) return res.status(400).send('Email is incorrect')            
            const validatePassword = await bcrypt.compare(req.body.password, results.password)
                if(!validatePassword) return res.status(400).send('Incorrect Password')
            
                const token = jwt.sign({ id: results.id }, process.env.APP_SECRET_TOKEN);
                res.header('auth_token',token).send(token)

            //     return res.status(202).json({
            //     //  data: results
            //  });
        });
    },

    register: async (req, res) => {
        // const body = req.body;
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);

        //validation
        const { error } = await registerValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        register(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    // success: 0,
                    // message: "Database connection errror",
                    error: err.sqlMessage
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },
    auth_user: (req, res) => {
        auth_user((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
}