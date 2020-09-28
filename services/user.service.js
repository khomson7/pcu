const pool = require("../config/database");

module.exports = {


    create: (data, callBack) => {
        pool.query(
            `insert into user_hos(id, email, password) 
                      values(?,?,?)`,

            [
                data.id,
                data.email,
                data.password

            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUsers: callBack => {
        pool.query(
            `select id,username,email from user_hos`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserId: (id, username, callBack) => {
        pool.query(
            `select id,username,email from user_hos where id = ? and username = ?`,
            [id, username],

            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            `update user_hos 
          set password=? , email=? where id = ?`,
            [

                data.password,
                data.email,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select email,password from user_hos where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getDateProcess: callBack => {
        pool2.query(
            `select * from date_process where id = '1'`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    createDateProcess: (data, callBack) => {
        pool2.query(
            `replace into date_process(id, b_date) 
                      values(?,?)`,

            [
                data.id,
                data.b_date

            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

};