const http = require('http');

const server = http.createServer((req,res)=>{
    res.end('Salem Alem!')

    server.listen(3000,()=>{
        console.log('Сервер http://localhost:3000 адресінде жұмыс істеп тұр');
        
    })
})
