const {
    getWsopipcu
} = require('../services/opitemrece.service');

module.exports = {
    getWsopipcu: (req, res) => {
        getWsopipcu((err, results) => {
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
}