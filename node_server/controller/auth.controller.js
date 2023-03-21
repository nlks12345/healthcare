const pool = require ('../database/connection')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 
const authController = {
    register: async (req,res) => {
        try{
            const {name,email,password} = req.body
            const [users] = await pool.query('select * from users where email = ?',[email])
            if(users[0]) return res.json({error: "Email already exists!"})       
            
            const hash = await bcrypt.hash(password, 10)

            const sql = "insert into users (name, email, password) values (?, ?, ?)"
            const [rows,fields] = await pool.query(sql, [name,email,hash])

            if(rows.affectedRows) {
                return res.json({
                            status:"success",
                            message: rows
                        })
            }
            else{
                return res.json({
                            status:"error",
                            message: rows
                        })
            }
           

        }catch(error){
            res.json({
                status:"error",
                message:error
            })
        }
    },
    login: async (req,res) => {
        try{
            const {name,email,password} = req.body
            const [users] = await pool.query('select * from users where email = ?',[email])

            if(!users[0]) return res.json({error: "Invalid email!"})       
            
            const {password: hash, id} = users[0]
          
            const check = await bcrypt.compare(password, users[0]?.password)
        
            if (check) {
                const accessToken = jwt.sign({userId: id}, 'secret', {expiresIn: 60 * 60})
                return res.json({
                    accessToken,
                    data:{
                        userId: id,
                        name,
                        email
                    }
                })
            }

            return res.json({error: "Wrong password!"})
            // const sql = "insert into users (name, email, password) values (?, ?, ?)"
            // const [rows,fields] = await pool.query(sql, [name,email,hash])

            // if(rows.affectedRows) {
            //     return res.json({
            //                 status:"success",
            //                 message: rows
            //             })
            // }
            // else{
            //     return res.json({
            //                 status:"error",
            //                 message: rows
            //             })
            // }
        }
        catch(error){
            console.log(error)
            res.json({
                status:"error",
                message:error
            })
        }
    }
}

module.exports = authController