let express = require('express')
let server = express()

let PORT = 3000

server.get('/',(req,res)=>{
    res.send('Қош келдіңіз!')
})

server.get('/about',(req,res)=>{
    res.send('Бұл сервер туралы қысқаша ақпарат')
})

server.get('/api/info',(req,res)=>{
    res.json({
        "developer": "Aliya",
        "subject":"Express"
    })
})

server.listen(PORT,()=>{
    console.log(`server осы портпен ${PORT} жұмыс істейді!`);
    
})