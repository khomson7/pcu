const pool = require("../config/database");
module.exports = {

    CreatePpstopcu: (data, callBack) => {
        pool.query(
            `REPLACE INTO wsc_pps_to_pcu(cid,pp_special_code,vstdate2)
                values(?,?,?)`,

            [
                data.cid,
                data.pp_special_code,
                data.vstdate2,
                
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    
};