let express = require('express')
let app = express()
let PORT = 8000

app.use(express.json());
app.post('/api/registration',(req,res)=>{
    let { login, email, password, confirmPassword} = req.body

    if(!login || !email || !password || !confirmPassword){
        return res.json({message: "Форманы толық толиырыңыз!"});
    }

    if(password !== confirmPassword){
        return res.json({message: "пароль сәйкес келмейді"})
    }

    return res.json({
        message: "Сәтті тіркелдіңіз!",
        data:{
            login:login,
            email:email
        }
    })
})

app.listen(PORT,()=>{
    console.log(`server ${PORT}`);    
})