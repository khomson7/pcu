const pool = require("../config/database");
module.exports = {

    getWsEpi: (callback) => {
        pool.query(`select t.HOSPCODE,t.PID,os.seq_id as SEQ,t.service_date as DATE_SERV,t.export_vaccine_code as VACCINETYPE 
        ,t.HOSPCODE as VACCINEPLACE,t.PROVIDER,concat(t.service_date,' ',t.service_time) as D_UPDATE,MD5(concat('wsc', os.seq_id,t.service_date,t.export_vaccine_code)) as apicheck
        FROM ovst_seq os
        INNER JOIN
        (select (select hospitalcode from opdconfig) as HOSPCODE
        ,LPAD(pw.person_id, 6, '0') as PID
        ,pws.service_date,pws.service_time,vn,t.export_vaccine_code,t.doctor_code as PROVIDER from person_wbc_service pws
        LEFT JOIN person_wbc pw on pw.person_wbc_id = pws.person_wbc_id
        INNER JOIN
        (select w.person_wbc_service_id,wv.export_vaccine_code,w.doctor_code from person_wbc_vaccine_detail w
        LEFT JOIN wbc_vaccine wv on wv.wbc_vaccine_id = w.wbc_vaccine_id
        WHERE wv.export_vaccine_code is not NULL)t on t.person_wbc_service_id = pws.person_wbc_service_id)t on t.vn = os.vn
        AND MD5(concat('wsc', os.seq_id,t.service_date,t.export_vaccine_code)) not in(select apicheck from f43check_epi)
        
        UNION
        
        select t.HOSPCODE,t.PID,os.seq_id as SEQ,t.vaccine_date as DATE_SERV,t.export_vaccine_code as VACCINETYPE 
        ,t.HOSPCODE as VACCINEPLACE,t.PROVIDER,concat(t.vaccine_date ,' ',t.vaccine_time) as D_UPDATE,MD5(concat('wsc', os.seq_id,t.vaccine_date,t.export_vaccine_code)) as apicheck
        FROM ovst_seq os
        INNER JOIN
        (select t.*
        ,LPAD(p.person_id, 6, '0') as PID 
        FROM person p
        LEFT JOIN person_epi pe on pe.person_id = p.person_id
        INNER JOIN
        (select (select hospitalcode from opdconfig) as HOSPCODE
        ,e.export_vaccine_code,el.doctor_code as PROVIDER  ,ev.vaccine_date,ev.vaccine_time,person_epi_id,ev.vn
        from person_epi_vaccine_list el
        LEFT JOIN person_epi_vaccine ev on ev.person_epi_vaccine_id = el.person_epi_vaccine_id
        LEFT JOIN epi_vaccine e on e.epi_vaccine_id = el.epi_vaccine_id)t on t.person_epi_id = pe.person_epi_id
        )t on t.vn = os.vn
        AND MD5(concat('wsc', os.seq_id,t.vaccine_date,t.export_vaccine_code)) not in(select apicheck from f43check_epi)
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            });
    },
    getWsPerson: (callback) => {
        pool.query(`select (select hospitalcode from opdconfig) as HOSPCODE, p.CID, LPAD(p.person_id, 6, '0') as PID,
        house_id as HID,
        (select provis_code FROM pname WHERE name = p.pname ) as PRENAME
        , fname as NAME, lname as LNAME, patient_hn as HN, sex as SEX, birthdate as BIRTH, marrystatus as MSTATUS
        , occupation as OCCUPATION_OLD, (select nhso_code FROM occupation where occupation = p.occupation) as OCCUPATION_NEW
        , LPAD(p.citizenship, 3, '0') as RACE
        , LPAD(p.nationality, 3, '0') as NATION
        , religion as RELIGION, (select LPAD(provis_code, 2, '0') FROM education where education = p.education) as EDUCATION, p.person_house_position_id as FSTATUS
        , p.father_cid as FATHER, p.mother_cid as MOTHER, p.sps_cid as COUPLE, null as VSTATUS, null as MOVEIN
        , person_discharge_id as DISCHARGE, discharge_date as DDISCHARGE
        , null as ABOGROUP, null as RHGROUP, null as LABOR, null as PASSPORT
        , house_regist_type_id as TYPEAREA, last_update as D_UPDATE
        ,MD5(concat('wsc', last_update)) as apicheck
        from person p 
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            });
    },
    getWsAnc: (callback) => {
        pool.query(`select t.HOSPCODE,LPAD(t.PID, 6, '0') as PID,os.seq_id as SEQ,t.DATE_SERV
        ,t.GRAVIDA,t.ANCNO,t.GA,null as ANCRESULT,t.ANCPLACE,t.PROVIDER,t.D_UPDATE
         ,MD5(concat('wsc', os.seq_id,t.DATE_SERV,t.GA)) as apicheck
        FROM vn_stat vn
        LEFT JOIN ovst_seq os on os.vn = vn.vn
        INNER JOIN
        (select (select hospitalcode from opdconfig) as HOSPCODE,pas.person_anc_id,pas.anc_service_date as DATE_SERV,vn
        ,null as ANCNO,(select hospitalcode from opdconfig) as ANCPLACE
        ,null as PROVIDER  
        ,pas.pa_week as GA
        ,concat(pas.anc_service_date,' ',pas.anc_service_time) as D_UPDATE 
        ,person_id as PID,preg_no as GRAVIDA
        from person_anc_service pas
        INNER JOIN person_anc pa on pa.person_anc_id = pas.person_anc_id
        )t on t.vn = vn.vn
        where MD5(concat('wsc', os.seq_id,t.DATE_SERV,t.GA)) not in(select apicheck from f43check_anc) limit 10000
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            });
    },
    CreateOpdallergy: (data, callBack) => {
        pool.query(
            `REPLACE INTO opd_allergy_10918(hn,report_date,agent,symptom,reporter,note,allergy_group_id,seriousness_id
                ,allergy_result_id,allergy_relation_id,patient_cid,agent_code24,entry_datetime
                ,update_datetime,force_no_order,opd_allergy_alert_type_id,opd_allergy_source_id)
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

            [
                data.hn,
                data.report_date,
                data.agent,
                data.symptom,
                data.reporter,
                data.note,
                data.allergy_group_id,
                data.seriousness_id,
                data.allergy_result_id,
                data.allergy_relation_id,
                data.patient_cid,
                data.agent_code24,
                data.entry_datetime,
                data.update_datetime,
                data.force_no_order,
                data.opd_allergy_alert_type_id,
                data.opd_allergy_source_id,

            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getTest: (callback) => {
        pool.query(`select * from opd_allergy
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            });
    }
};