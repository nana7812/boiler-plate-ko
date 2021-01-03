const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

const config = require('./config/key');

//bodayparser = 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있도록
app.use(bodyParser.urlencoded({extended: true}));//application/x-www-form-urlencoded <- 이렇게 된 데이터 분석해서 가져오기
app.use(bodyParser.json());// applicaion/json <- 이 타입의 데이터 

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true , useUnifiedTopology:true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('connected...'))
  .catch(err =>console.log(err))
  
app.get('/', (req,res) => res.send('Hello World!~~!!!'))


//회원가입을위한 라우터
app.post('/register',(req,res) => {
   //회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
 
  const user = new User(req.body)
   //정보들이 user 모델에 저장
  user.save((err,userInfo) => {
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  })

})

app.listen(port, () => console.log('Example app listening on port ${port}!'))
