const {

    CreateDrugnew
    ,CreateDrugitemsrep

} = require('../services/drug.service');

module.exports = {
    CreateDrugnew: (req, res) => {
        const body = req.body;
        CreateDrugnew(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    CreateDrugitemsrep: (req, res) => {
        const body = req.body;
        CreateDrugitemsrep(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }

};