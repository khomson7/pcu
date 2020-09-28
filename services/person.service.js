const pool = require("../config/database");
module.exports = {

    CreateOpdallergy: (data, callBack) => {
        pool.query(
            `REPLACE INTO opd_allergy_10918(hn,agent,symptom,note,patient_cid)
            values(?,?,?,?,?)`,

            [
                data.hn,
                data.agent,
                data.symptom,
                data.note,
                data.patient_cid,


            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    CreateCidencrypt: (data, callBack) => {
        pool.query(
            `REPLACE INTO wsc_cid_encrypt(cid_encrypt,check_edit)
            values(?,?)`,

            [
                data.cid_encrypt,
                data.check_edit,

            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results)
            }
        );
    }
};