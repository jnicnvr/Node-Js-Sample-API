const { create, index, show, update, destroy } = require('../Services/UserService')
const { genSaltSync, hashSync } = require('bcrypt')
const { registerValidation } = require('../../config/validation')

module.exports = {
    create: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        //validation
        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },
    index: (req, res) => {
        index((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                data: results
            });
        });
    },
    show: (req, res) => {
        const id = req.params.id;
        show(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    message: "Record not Found"
                });
            }
            //   results.password = undefined;
            return res.json({
                data: results
            });
        });
    },
    update: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        update(id, body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                message: "updated successfully"
            });
        });
    },
    destroy: (req, res) => {
        const id = req.params.id;
        destroy(id, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            // if (!results) {
            //     return res.json({
            //         message: "Record Not Found"
            //     });
            // }
            return res.json({
                message: "Deleted successfully"
            });
        });
    }
}