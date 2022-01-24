const pool = require('../../config/database')
const bcrypt = require('bcrypt')

module.exports = {
    login: (data, callBack) => {       
            // console.log(data)
             pool.query(
                `SELECT id, name, email, email_verified_at, password, remember_token, created_at, updated_at from users where email = ?`,
                [data.email],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }
                    return callBack(null, results[0]);
                   
                }
               
            )
    },
    register: (data, callback) => {
        pool.query(`INSERT INTO users(name, email, password, created_at, updated_at) VALUES(?,?,?,?,?)`,
            [
                data.name,
                data.email,
                data.password,
                data.created_at,
                data.updated_at,
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        )``
    },
    auth_user: callBack => {
        pool.query(
            `SELECT id, name, email, email_verified_at, password, remember_token, created_at, updated_at from users`,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}