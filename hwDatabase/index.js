let express = require('express')
let app = express()

require('dotenv').config()

let pool = require('./db') 

app.use(express.json())
let PORT = process.env.PORT || 8001

app.get('/books',async(req,res)=>{ 
    try{
       const result = await pool.query('SELECT * FROM books')
       result ? res.status(200).json(result.rows) : result.status(400).json({message:"bad request!"})
    }catch(err){
        console.log('Aqparat tabylmady!', err.message);        
    }
})


app.get('/books/:id',async(req,res)=>{
    let{id}=req.params
    
    let foundBooks = books.find(el=>el.id == id)
    foundBooks ? res.status(200).json(foundBooks) : res.status(400).json({message:"not id"})
})



app.listen(PORT,()=>{
    console.log(`Server is working on ${PORT} port!`);
  
})