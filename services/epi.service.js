const pool = require("../config/database");
module.exports = {

    getEpi: (callback) => {
        pool.query(`select t.*
        ,CASE 
WHEN t.list_vaccine is null THEN (select GROUP_CONCAT(export_vaccine_code) from wbc_vaccine)
ELSE
(select GROUP_CONCAT(export_vaccine_code) from wbc_vaccine WHERE !FIND_IN_SET(export_vaccine_code,t.list_vaccine)) end
as vv 
        from
        (select t.*
         ,(select t2.list_vaccine
         FROM
        (select t.PID,GROUP_CONCAT( DISTINCT t.vaccinetype) as list_vaccine  FROM
        (select p.person_id PID
                ,p.CID
                ,p.patient_hn HN
                ,v.export_vaccine_code vaccinetype
                ,'WBC' type
                from person_wbc_vaccine_detail wbcd
                left join person_wbc_service wbcs on wbcd.person_wbc_service_id = wbcs.person_wbc_service_id
                left join person_wbc wbc on wbcs.person_wbc_id = wbc.person_wbc_id
                left join wbc_vaccine v on v.wbc_vaccine_id = wbcd.wbc_vaccine_id
                left join person p on wbc.person_id=p.person_id
                left join ovst o on o.vn=wbcs.vn
                left join ovst_seq q on q.vn=o.vn
                where p.death<>'Y'
                and wbcd.wbc_vaccine_id is not null
                
                union
                select ifnull(p.person_id,pt.hn) PID
                ,pt.CID
                ,pt.HN
                ,pv.export_vaccine_code vaccinetype
                ,'Vaccine            ' type
                from ovst_vaccine ov
                left join ovst_seq q on q.vn = ov.vn
                left join ovst o on o.vn = ov.vn
                left join patient pt on o.hn=pt.hn
                left join person p on p.cid=pt.cid
                left join person_vaccine pv on pv.person_vaccine_id = ov.person_vaccine_id
                where 
                p.person_id is not null
                and p.death<>'Y'
                and ov.person_vaccine_id is not null
                union
                select p.person_id PID
                ,p.CID
                ,p.patient_hn HN
                ,pv.export_vaccine_code vaccinetype
                ,'Other' type
                from person_vaccine_elsewhere a
                left join person p on p.person_id=a.person_id
                left join person_vaccine pv on pv.person_vaccine_id = a.person_vaccine_id)t
        WHERE (t.vaccinetype is not NULL AND t.vaccinetype not in('-')) AND t.PID is not NULL
        GROUP BY t.PID)t2 where t2.PID = t.person_id) as list_vaccine     
               
        
        FROM
        (select pw.person_id,person_wbc_id,birth_weight 
        ,concat(p.age_y,LPAD(p.age_m,2,"0"),LPAD(p.age_d,2,"0")) as g
        ,concat(p.pname,p.fname,' ',p.lname) as ptname,p.age_y,p.age_m,p.age_d
        ,upper(md5(concat('r9',p.cid,'refer#09'))) as cid_encode
        from person_wbc pw
        INNER JOIN person p on p.person_id = pw.person_id
        WHERE (discharge not in('Y') or discharge is null))t)t
        order by t.g desc
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            });
    },
    getEpiDetail: (cid, callback) => {
        pool.query(`select * from
        (select p.person_id PID
        ,upper(md5(concat('r9',p.cid,'refer#09'))) as cid_encrypt
        ,p.patient_hn HN
        ,q.seq_id Seq
        ,date_format(wbcs.service_date,'%Y-%m-%d') Date_Serv
        ,v.wbc_vaccine_name VaccineName
        ,v.export_vaccine_code VaccineType
        ,null as Provider
        ,if(wbcs.wbc_location_type_id = 1,(select hospitalcode from opdconfig),'00000') VaccinePlace
        ,date_format(wbc.last_update,'%Y-%m-%d- %H:%i:%s') D_Update
        ,'WBC' type
        from person_wbc_vaccine_detail wbcd
        left join person_wbc_service wbcs on wbcd.person_wbc_service_id = wbcs.person_wbc_service_id
        left join person_wbc wbc on wbcs.person_wbc_id = wbc.person_wbc_id
        left join wbc_vaccine v on v.wbc_vaccine_id = wbcd.wbc_vaccine_id
        left join person p on wbc.person_id=p.person_id
        left join ovst o on o.vn=wbcs.vn
        left join ovst_seq q on q.vn=o.vn
        where upper(md5(concat('r9',p.cid,'refer#09'))) = ?
        and p.death<>'Y'
        and wbcd.wbc_vaccine_id is not null
        
        union 
        
        select p.person_id PID
        ,upper(md5(concat('r9',p.CID,'refer#09'))) as cid_encrypt
        ,p.patient_hn HN
        ,q.seq_id Seq
        ,date_format(epiv.vaccine_date,'%Y-%m-%d') Date_Serv
        ,v.epi_vaccine_name vaccinename
        ,v.export_vaccine_code vaccinetype
        ,null as Provider
        ,if(epiv.person_epi_place_id=2,(select hospitalcode from opdconfig),'00000') vaccineplace
        ,date_format(epi.last_update,'%Y-%m-%d %H:%i:%s') D_Update
        ,'EPI' type
        from person_epi_vaccine_list epil
        left join person_epi_vaccine epiv on epiv.person_epi_vaccine_id = epil.person_epi_vaccine_id 
        left join person_epi epi on epi.person_epi_id = epiv.person_epi_id
        left join epi_vaccine v on v.epi_vaccine_id = epil.epi_vaccine_id
        left join person p on p.person_id=epi.person_id
        left join ovst o on o.vn=epiv.vn
        left join ovst_seq q on q.vn=o.vn
        where upper(md5(concat('r9',p.cid,'refer#09'))) = ?
        and p.death<>'Y'
        and epil.epi_vaccine_id is not null
        
        union
        select p.person_id PID
        ,upper(md5(concat('r9',p.CID,'refer#09'))) as cid_encrypt
        ,p.patient_hn HN
        ,q.seq_id Seq
        ,date_format(sv.vaccine_date,'%Y-%m-%d') Date_Serv
        ,v.student_vaccine_name vaccinename
        ,v.export_vaccine_code vaccinetype
        ,null Provider
        ,if(sv.student_vaccine_place_id=2,(select hospitalcode from opdconfig),'00000') vaccineplace
        ,date_format(s.last_update,'%Y-%m-%d %H:%i:%s') D_Update
        ,'Student' type
        from village_student_vaccine_list sl
        left join village_student_vaccine sv on sv.village_student_vaccine_id = sl.village_student_vaccine_id 
        left join village_student s on s.village_student_id = sv.village_student_id
        left join student_vaccine v on v.student_vaccine_id = sl.student_vaccine_id
        left join person p on p.person_id=s.person_id
        left join ovst o on o.vn=sv.vn
        left join ovst_seq q on q.vn=o.vn
        where upper(md5(concat('r9',p.cid,'refer#09'))) = ?
        and p.death<>'Y'
        and sl.student_vaccine_id is not null
        
        union
        select p.person_id PID
        ,upper(md5(concat('r9',p.CID,'refer#09'))) as cid_encrypt
        ,p.patient_hn HN
        ,q.seq_id Seq
        ,date_format(ancs.anc_service_date,'%Y-%m-%d') Date_Serv
        ,ancs1.anc_service_name vaccinename
        ,ancs1.export_vaccine_code vaccinetype
        ,null as Provider
        ,if(ancs.anc_location_type_id=1,(select hospitalcode from opdconfig),'00000') vaccineplace
        ,date_format(anc.last_update,'%Y-%m-%d %H:%i:%s') D_Update
        ,'ANC' type
        from person_anc_service_detail ancd
        left join person_anc_service ancs on ancs.person_anc_service_id = ancd.person_anc_service_id 
        left join person_anc anc on anc.person_anc_id = ancs.person_anc_id
        left join anc_service ancs1 on ancs1.anc_service_id = ancd.anc_service_id
        left join person p on p.person_id=anc.person_id
        left join ovst o on o.vn=ancs.vn
        left join ovst_seq q on q.vn=o.vn
        where upper(md5(concat('r9',p.cid,'refer#09'))) = ?
        and p.death<>'Y'
        and ancd.anc_service_id is not null
        
        union
        select ifnull(p.person_id,pt.hn) PID
        ,upper(md5(concat('r9',p.CID,'refer#09'))) as cid_encrypt
        ,pt.HN
        ,q.seq_id Seq
        ,date_format(o.vstdate,'%Y-%m-%d') Date_Serv
        ,pv.vaccine_name vaccinename
        ,pv.export_vaccine_code vaccinetype
        ,null as Provider
        ,(select hospitalcode from opdconfig) vaccineplace
        ,date_format(concat(o.vstdate,' ',o.vsttime),'%Y-%m-%d %H:%i:%s') D_Update
        ,'Vaccine' type
        from ovst_vaccine ov
        left join ovst_seq q on q.vn = ov.vn
        left join ovst o on o.vn = ov.vn
        left join patient pt on o.hn=pt.hn
        left join person p on p.cid=pt.cid
        left join person_vaccine pv on pv.person_vaccine_id = ov.person_vaccine_id
        where upper(md5(concat('r9',p.cid,'refer#09'))) = ?
        and p.person_id is not null
        and p.death<>'Y'
        and ov.person_vaccine_id is not null
        
        union
        select p.person_id PID
        ,upper(md5(concat('r9',p.CID,'refer#09'))) as cid_encrypt
        ,p.patient_hn HN
        ,'' Seq
        ,date_format(a.vaccine_date,'%Y-%m-%d') Date_Serv
        ,pv.vaccine_name vaccinename
        ,pv.export_vaccine_code vaccinetype
        ,'' Provider
        ,if(a.vaccine_hospcode<>'',a.vaccine_hospcode,if(a.hospcode<>'',a.hospcode,'00000')) vaccineplace
        ,date_format(a.update_datetime,'%Y-%m-%d %H:%i:%s')D_Update
        ,'Other' type
        from person_vaccine_elsewhere a
        left join person p on p.person_id=a.person_id
        left join person_vaccine pv on pv.person_vaccine_id = a.person_vaccine_id
        where upper(md5(concat('r9',p.cid,'refer#09'))) = ?)t
ORDER BY t.Date_Serv asc
        `,
        
            [cid,cid,cid,cid,cid,cid],
            (error, results, feilds) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            });
    },
    getWbcvaccine: (callback) => {
        pool.query(`select export_vaccine_code,wbc_vaccine_name from wbc_vaccine `,
            [],
            (error, results, feilds) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            });
    },
    getEpi2: (callback) => {
        pool.query(`select t.*
        ,CASE 
        WHEN t.list_vaccine is null THEN (select GROUP_CONCAT(export_vaccine_code) from epi_vaccine)
        ELSE
        (select GROUP_CONCAT(export_vaccine_code) from epi_vaccine WHERE !FIND_IN_SET(export_vaccine_code,t.list_vaccine)) end
        as vv 
        from
        (select t.*
         ,(select t2.list_vaccine
         FROM
        (select t.PID,GROUP_CONCAT( DISTINCT t.vaccinetype) as list_vaccine  FROM
        (select p.person_id PID
                ,p.CID
                ,p.patient_hn HN
                ,v.export_vaccine_code vaccinetype
                ,'EPI' type
                from person_epi_vaccine_list epil
                left join person_epi_vaccine epiv on epiv.person_epi_vaccine_id = epil.person_epi_vaccine_id 
                left join person_epi epi on epi.person_epi_id = epiv.person_epi_id
                left join epi_vaccine v on v.epi_vaccine_id = epil.epi_vaccine_id
                left join person p on p.person_id=epi.person_id
                left join ovst o on o.vn=epiv.vn
                left join ovst_seq q on q.vn=o.vn
                where  p.death<>'Y'
                and epil.epi_vaccine_id is not null
                
                union
                select ifnull(p.person_id,pt.hn) PID
                ,pt.CID
                ,pt.HN
                ,pv.export_vaccine_code vaccinetype
                ,'Vaccine            ' type
                from ovst_vaccine ov
                left join ovst_seq q on q.vn = ov.vn
                left join ovst o on o.vn = ov.vn
                left join patient pt on o.hn=pt.hn
                left join person p on p.cid=pt.cid
                left join person_vaccine pv on pv.person_vaccine_id = ov.person_vaccine_id
                where 
                p.person_id is not null
                and p.death<>'Y'
                and ov.person_vaccine_id is not null
                union
                select p.person_id PID
                ,p.CID
                ,p.patient_hn HN
                ,pv.export_vaccine_code vaccinetype
                ,'Other' type
                from person_vaccine_elsewhere a
                left join person p on p.person_id=a.person_id
                left join person_vaccine pv on pv.person_vaccine_id = a.person_vaccine_id)t
        WHERE (t.vaccinetype is not NULL AND t.vaccinetype not in('-')) AND t.PID is not NULL
        GROUP BY t.PID)t2 where t2.PID = t.person_id) as list_vaccine     
               
        
        FROM
        (select pw.person_id,person_epi_id 
        ,concat(p.age_y,LPAD(p.age_m,2,"0"),LPAD(p.age_d,2,"0")) as g
        ,concat(p.pname,p.fname,' ',p.lname) as ptname,p.age_y,p.age_m,p.age_d
        ,upper(md5(concat('r9',p.cid,'refer#09'))) as cid_encode
        from person_epi pw
        INNER JOIN person p on p.person_id = pw.person_id
        WHERE (discharge not in('Y') or discharge is null))t)t
        order by t.g desc  
        `,
            [],
            (error, results, feilds) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            });
    },
    getEpivaccine: (callback) => {
        pool.query(`select export_vaccine_code,epi_vaccine_name from epi_vaccine `,
            [],
            (error, results, feilds) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            });
    }
    
};