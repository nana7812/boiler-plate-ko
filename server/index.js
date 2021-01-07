const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {User} = require('./models/User');
const {auth} = require('./middleware/auth');

const config = require('./config/key');

//bodayparser = 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있도록
app.use(bodyParser.urlencoded({extended: true}));//application/x-www-form-urlencoded <- 이렇게 된 데이터 분석해서 가져오기
app.use(bodyParser.json());// applicaion/json <- 이 타입의 데이터 
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true , useUnifiedTopology:true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('connected...'))
  .catch(err =>console.log(err))
  
app.get('/', (req,res) => res.send('Hello World!~~!!!'))


//회원가입을위한 라우터
app.post('/register',(req,res) => {
   //회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
 
  const user = new User(req.body)//모든 정보를 model에 넣어줌


   //정보들이 user 모델에 저장
  user.save((err,userInfo) => {
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  })
})

app.post('/api/users/login',(req,res) => {
  
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email: req.body.emil},(err, user) =>{
    if(!user){
      return res.json({
        loginSuccess:false,
        message: "제공된 이메일에 해당하는 유저가 없습니다"
      })
    }
    //요청한 이메일이 데이터베이스에 있으면 비밀번호가 맞는지 확인한다
    user.comparePassword(req.body.password ,(err,isMatch) =>{
      if(!isMatch)
        return res.json({loginSuccess:false ,message:"비밀번호가 틀렸습니다"})

      //비밀번호까지 맞다면 토큰을 생성한다
      user.generateToken((err,user) =>{
        if(err) return res.status(400).send(err);
        //토큰을 저장한다. 어디에? 쿠키,로컬스토리지
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess:true,userId: user._id})

      })
    })
  })
})

app.get('/api/users/auth',auth,(req,res) =>{
  //여기까지  미들웨어를 통과해 왔다는 애기는 auth = true
  res.status(200).json({
    _id : req.user._id,
    isAdmin: req.user.role == 0 ? false : true,
    isAuth: true,
    email :req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })

})

app.get('/api/hello',(req,res)=>{
  res.send("안녕하세요~")
})
app.get('/api/users/logout',auth,(req,res) => {

  User.findOneAndUpdate({_id:req.user._id},
    {token :""}
    ,(err,user) => {
      if(err) return res.json({success:false,err});
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => console.log('Example app listening on port ${port}!'))
