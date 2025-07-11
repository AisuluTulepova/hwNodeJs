let express = require('express')
let app = express()
let pool = require('./db')
require('dotenv').config()

app.use(express.json())
let PORT = process.env.PORT || 8001

app.get('/users',async(req,res)=>{
    try{
       const result =await pool.query('select * from users')
       result ? res.status(200).json(result.rows) : result.status(400).json({message:"bad result!"})
    }catch(err){
        console.log('Aqparat BASAmen bailanysa almady!',err);       
    }
})



app.listen(PORT,()=>{
        console.log(`server ${PORT} port!`);
        
})