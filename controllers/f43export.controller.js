const {
    getWsEpi,
    getWsPerson,
    getWsAnc,
    CreateOpdallergy,
    getTest,
    getWsepis

} = require('../services/f43export.service');

module.exports = {
    getWsEpi: (req, res) => {
        getWsEpi((err, results) => {
            if (err) {
                //  console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Reccord Not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });

        });
    },
    getWsPerson: (req, res) => {
        getWsPerson((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Reccord Not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });

        });
    },
    getWsAnc: (req, res) => {
        getWsAnc((err, results) => {
            if (err) {
                //   console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Reccord Not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });

        });
    },
    CreateOpdallergy: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
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
    getTest: (req, res) => {
        getTest((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Reccord Not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });

        });
    },
    getWsepis: (req, res) => {
        getWsepis((err, results) => {
            if (err) {
                //  console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Reccord Not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });

        });
    }

};