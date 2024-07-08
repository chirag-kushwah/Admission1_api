const express = require("express")
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const web = require('./routes/web')
const connectDB = require('./db/connectDB')
const cors = require('cors')

//cors 
app.use (cors())

//image upload
const fileUpload = require('express-fileupload')
//temptiles uploaders
app.use(fileUpload({useTempFiles:true}))

// for data get in api
app.use(express.json())

connectDB()


// lode router
app.use('/api',web)
//localhost:4000/api


















//srever create
app.listen(process.env.PORT,()=>{
    console.log(`server running on localhost: ${process.env.PORT}`)
})





