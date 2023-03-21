const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()

const verifyToken = require('./middlewares/auth')
const apptRouter = require('./routes/appts.router')
const authRouter = require('./routes/auth.router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors());
app.use('/api/v1/appointment', apptRouter)
app.use('/api/v1/auth', authRouter)

app.get('/api/v1/verify', verifyToken, (req,res) => {
    console.log("User:: ", req.user)

    return res.json({
        status: req.status,
        data: [1,2,3] ,
        user: req.user   
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server runing on ${PORT}`)
})