const { getEpi, getEpiDetail,  getWbcvaccine, getEpi2, getEpivaccine } = require("../services/epi.service");


module.exports = {
    getEpi: (req, res) => {
        getEpi((err, results) => {
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
            return res.json( results );

        });
    },
    getEpiDetail: (req, res) => {
        const cid = req.params.cid;
        getEpiDetail(cid, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
           // results.cid = undefined;

            return res.json( //{
                //    success: 1,
                results
            );
            // });
        });
    },
    getWbcvaccine: (req, res) => {
        getWbcvaccine((err, results) => {
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
            return res.json( results );

        });
    },
    getEpi2: (req, res) => {
        getEpi2((err, results) => {
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
            return res.json( results );

        });
    },
    getEpivaccine: (req, res) => {
        getEpivaccine((err, results) => {
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
            return res.json( results );

        });
    }

};