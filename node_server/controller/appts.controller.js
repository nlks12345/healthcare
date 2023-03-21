const pool = require('../database/connection')
const apptController = {
    getAll: async (req,res) => {
        try{
            const [rows ,fields] = await pool.query('select * from appointments')
            res.json({
                data: rows
            })
        }
        catch(error){
           // console.log(error)
            res.json({
                status: "error",
                message: error
            })
        }
    },
    getById: async (req,res) => {
        try{
            const {id} = req.params
            const [rows ,fields] = 
            await pool.query('select * from appointments where id =?',[id])

            res.json({
                data: rows
            })
        }
        catch(error){

            res.json({
                status: "error",
                message: error
            })
        }
    },
    create: async (req,res) => {
      
        try{
            const {code,appt_datetime,patient,created_at,status} = req.body
            const sql = "insert into appointments (code,appt_datetime,patient,created_at,status) values(?,?,?,?,?)"
            const [rows,fields] = await pool.query(sql,[code,appt_datetime,patient,created_at,status])
            res.json({
                status:"success",
                data: rows
            })

            // {
            //     "data": {
            //         "fieldCount": 0,
            //         "affectedRows": 1,
            //         "insertId": 5,
            //         "info": "",
            //         "serverStatus": 2,
            //         "warningStatus": 2
            //     }
            // }
        }
        catch(error){
            // console.log(error)
            res.json({
                status: "error",
                message: error
            })
        }
    },
    reschedule: async (req,res) => {
        try{
            const {id,status} = req.body
            // const {id} = req.body
            const sql = "update appointments set status = ? where id = ?"
            const [rows,fields] = await pool.query(sql,[status,id])
           
            if(rows){
                res.json({
                    status:"success",
                    data_update: rows

                })
                // const appt_details =  await pool.query('select * from appointments where id =?',{id})
                // const [code,appt_datetime,patient,created_at,status] = req.body
                // const new_appt_sql = "insert into appointments (code,appt_datetime,patient,created_at,status) values(?,?,?,?,?)"
                // const [rows_new,fields_new] = await pool.query(sql,[code,appt_datetime,patient,created_at,status])

                // if(rows_new){
                //     
                // }

            }
            
        }
        catch(error){
            // console.log(error)
            res.json({
                status: "error",
                message: error
            })
        }
    },
    arrive: async (req,res) => {
        try{
            const {id,code,status,arrived_at} = req.body
            // const {id} = req.params
            const sql = "update appointments set status = ?, arrived_at = ? where id = ?)"
            const [rows,fields] = await pool.query(sql,[status,arrived_at,id,code])

            if(rows){
                if(rows_new){
                    res.json({
                        status:"success",
                        data: rows
                    })
                }

            }
            
        }
        catch(error){
            // console.log(error)
            res.json({
                status: "error",
                message: error
            })
        }
    }

}

module.exports = apptController

