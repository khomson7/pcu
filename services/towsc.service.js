const pool = require("../config/database");
module.exports = {

    getChospitalAmp: (callback) => {
        pool.query(`SELECT GROUP_CONCAT(village_moo) as moopart,(select hospitalcode from opdconfig) as hoscode from village WHERE village_moo not in('0')`,
            [],
            (error, results, feilds) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            });
    }
    
};