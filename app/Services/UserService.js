const pool = require('../../config/database')

module.exports = {
    create: (data, callback) => {             
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
        )
    },
    index: callBack => {
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
    show: (id, callBack) => {
        pool.query(
            `SELECT id, name, email, email_verified_at, password, remember_token, created_at, updated_at from users where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    update: (id, data, callBack) => {
        console.log(data)
        pool.query(
            `UPDATE users SET name=?, email=?, password=? WHERE id=?`,
            [
                data.name,
                data.email,
                data.password,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    destroy: (id, callBack) => {
        pool.query(
            `DELETE FROM users WHERE id=?`,
            [id],
            (error, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, null);
            }
        );
    },
}