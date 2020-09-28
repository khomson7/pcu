const {
    CreateOpdallergy,
    CreateCidencrypt

} = require('../services/person.service');

module.exports = {
    CreateOpdallergy: (req, res) => {
        const body = req.body;
        CreateOpdallergy(body, (err, results) => {
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
    CreateCidencrypt: (req, res) => {
        const body = req.body;
        CreateCidencrypt(body, (err, results) => {
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