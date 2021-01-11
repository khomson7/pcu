const pool = require("../config/database");
module.exports = {

    CreateDrugnew: (data, callBack) => {
        pool.query(
            `REPLACE INTO drugitems(icode,name,strength,units,unitprice,dosageform,criticalpriority,drugaccount,drugcategory,drugnote,hintcode,istatus,
                lastupdatestdprice,lockprice,lockprint,maxlevel,minlevel,maxunitperdose,packqty,reorderqty,stdprice,stdtaken,therapeutic,
                therapeuticgroup,default_qty,gpo_code,use_right,i_type,drugusage,must_paid,alert_level,access_level,sticker_short_name,
                paidst,antibiotic,displaycolor,empty,empty_text,unitcost,ipd_price,habit_forming,did,price2,price3,
                ipd_price2,ipd_price3,price_lock,pregnancy,pharmacology_group1,pharmacology_group2,pharmacology_group3,generic_name,show_pregnancy_alert,
                show_notify,show_notify_text,income,print_sticker_pq,charge_service_opd,charge_service_ipd,
                ename,dose_type,habit_forming_type,no_discount,therapeutic_eng,hintcode_eng,limit_drugusage,print_sticker_header,calc_idr_qty,item_in_hospital,
                no_substock,volume_cc,usage_code,frequency_code,time_code,dispense_dose,usage_unit_code,dose_per_units,ipd_default_pay,
                continuous,substitute_icode,fp_drug,provis_medication_unit_code,sks_product_category_id,sks_drug_code,
                sks_dfs_text,tpu_code_list)
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,
                    ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

            [
                data.icode,
                data.name,
                data.strength,
                data.units,
                data.unitprice,
                data.dosageform,
                data.criticalpriority,
                data.drugaccount,
                data.drugcategory,
                data.drugnote,
                data.hintcode,
                data.istatus,
                data.lastupdatestdprice,
                data.lockprice,
                data.lockprint,
                data.maxlevel,
                data.minlevel,
                data.maxunitperdose,
                data.packqty,
                data.reorderqty,
                data.stdprice,
                data.stdtaken,
                data.therapeutic,
                data.therapeuticgroup,
                data.default_qty,
                data.gpo_code,
                data.use_right,
                data.i_type,
                data.drugusage,
                data.must_paid,
                data.alert_level,
                data.access_level,
                data.sticker_short_name,
                data.paidst,
                data.antibiotic,
                data.displaycolor,
                data.empty,
                data.empty_text,
                data.unitcost,
                data.ipd_price,
                data.habit_forming,
                data.did,
                data.price2,
                data.price3,
                data.ipd_price2,
                data.ipd_price3,
                data.price_lock,
                data.pregnancy,
                data.pharmacology_group1,
                data.pharmacology_group2,
                data.pharmacology_group3,
                data.generic_name,
                data.show_pregnancy_alert,
                data.show_notify,
                data.show_notify_text,
                data.income,
                data.print_sticker_pq,
                data.charge_service_opd,
                data.charge_service_ipd,
                data.ename,
                data.dose_type,
                data.habit_forming_type,
                data.no_discount,
                data.therapeutic_eng,
                data.hintcode_eng,
                data.limit_drugusage,
                data.print_sticker_header,
                data.calc_idr_qty,
                data.item_in_hospital,
                data.no_substock,
                data.volume_cc,
                data.usage_code,
                data.frequency_code,
                data.time_code,
                data.dispense_dose,
                data.usage_unit_code,
                data.dose_per_units,
                data.ipd_default_pay,
                data.continuous,
                data.substitute_icode,
                data.fp_drug,
                data.provis_medication_unit_code,
                data.sks_product_category_id,
                data.sks_drug_code,
                data.sks_dfs_text,
                data.tpu_code_list,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    CreateSdrugnew: (data, callBack) => {
        pool.query(
            `REPLACE INTO s_drugitems(icode,name,strength,units,dosageform,drugnote,use_right,must_paid 
                ,istatus,access_level,paidst,displaycolor,price_lock,ename,cost,income,is_medication,is_medsupply
                )
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

            [
                data.icode,
                data.name,
                data.strength,
                data.units,
                data.dosageform,
                data.drugnote,
                data.use_right,
                data.must_paid,
                data.istatus,
                data.access_level,
                data.paidst,
                data.displaycolor,
                data.price_lock,
                data.ename,
                data.cost,
                data.income,
                data.is_medication,
                data.is_medsupply,
                          
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