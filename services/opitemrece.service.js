const pool = require("../config/database");
module.exports = {
    getWsopipcu: (callback) => {
        pool.query(`select md5(concat('wsc',t.hospcode,t.vn,t.icode)) as mkey,t.* FROM
        (select (select hospitalcode from opdconfig) as hospcode,o.icode,d.name,o.vn
        ,md5(concat('wsc',pt.cid)) as mpid,o.qty,date_format(o.vstdate,'%Y-%m-%d') as vstdate
        ,o.vsttime
        from opitemrece o
        INNER JOIN drugitems d on d.icode = o.icode
        LEFT JOIN patient pt on pt.hn = o.hn
        WHERE o.vstdate in(select date_work FROM wsc_t_work_pcu) 
        )t
        where  md5(concat('wsc',t.hospcode,t.vn,t.icode)) NOT in(select mkey from wsc_opitemrece_pcu_check)
        ORDER BY t.vn
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            });
    }
}