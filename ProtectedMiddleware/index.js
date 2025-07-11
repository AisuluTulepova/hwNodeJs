let express = require('express')
let app = express()
let pool = require('./db')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

require('dotenv').config()
PORT = process.env.PORT || 3000
app.use(express.json())

app.get('/products',async(req,res)=>{
       try{
            let result = await pool.query('SELECT * FROM product')
            result.rows.length > 0 ? res.status(200).json(result.rows) : res.status(404).json({message:"aqparat tabylmady!"})
       }catch(err){
        console.log('DB-men bailanysu mumkin bolmady!',err);       
       }
})

app.post('/login',(req,res)=>{
    let {email, password} = req.body

    if(!email || !password){
      res.status(404).json({message:"Zhiberilgen aqparat lotyq emes!"})  
    } else{        
        const token = jwt.sign({userId:result.rows[0].id}, 'secret123', {expiresIn: '1h'})
        res.status(200).json({message:"Login satti otti", token})
    }
})
        
function authMiddleware(req,res,next){
      let authHeader = req.headers.authorization

      if(!authHeader) res.status(401).json({message:"Token missing!"})
     
      let token = authHeader.split(' ')[1]

      try{
           const user = jwt.verify(token,'secret123')
           req.user = user
           next()
      }catch(err){
        res.status(401).json({message:"invalid or expired token!"})
      }
}

app.post('/products',async(req,res)=>{
    let {name,price,quantity} = req.body

    if(!name || !price || !quantity){
        res.status(404).json({message:"tolyq toltyrynyz!"})  
    }else{
        try{
            let result = await pool.query('insert into product (name, price,quantity) values ($1, $2, $3) RETURNING *',[name,price,quantity])
            res.status(200).json({message:"Zhana tovar satti qosyldy!"})
            products.push({id:products.length +1, name,price,quantity})
        }
        catch(err){
            res.status(404).json({message:"Server ERROR!"})
        }
    }
})

app.get('/profile',authMiddleware,async(req,res)=>{
    let idUser = req.user.userId
    try{
        let result = await pool.query('SELECT * FROM product where id=$1',[idUser])
        result.rows.length >0 ?  res.status(200).json(result.rows[0]) : res.status(404).json({message:"user not found!"})
    }catch(err){
        res.status(400).json({message:"DB - men bailanysu mumkin bolmady!"})
        console.log(err);
        
    }
})









app.listen(PORT,()=>{
    console.log('Server is working port',PORT);
})


