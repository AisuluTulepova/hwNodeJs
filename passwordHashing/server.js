let express = require('express')
let bcrypt = require('bcrypt')
let app = express()
let pool = require('./db')
require('dotenv').config()
let PORT = process.env.PORT || 8001

app.use(express.json())

app.get('/user',async(req,res)=>{
    try{
       let result = await pool.query('SELECT * FROM users')
       result.rows.length>0 ? res.status(200).json(result.rows) :res.status(404).json({message:"aqparat tabylmady!"})
    }catch(err){
         console.log('DB men bailanysu mumkin bolmady!',err); 
    }
})

app.post('/register',async(req,res)=>{
    let {username,password} = req.body
    if(!username || !password){
        res.status(400).json({message:"Aqparatty tolyq toltyrynyz!"})
    }else{
        try{
            let hashedPassword = await bcrypt.hash(password,10)
            if(hashedPassword){
                let result = await pool.query('insert into users (username, password) values($1,$2) RETURNING *',[username,hashedPassword])
                result.rows.length>0 ? res.status(201).json(result.rows) : res.status(400).json({message:"Zhana users qurastyru mumkin bolmady!"})
            }else{
                res.status(400).json({message:"Qupia sozdi Hashtau kezinde qatelik tuyndady!"})
            }

        }catch(err){
            console.log('DB men bailanysu mumkin bolmady!',err);            
        }

    }
})








app.listen(PORT,()=>{
    console.log('Server is working port', PORT);    
})
