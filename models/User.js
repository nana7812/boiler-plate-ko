const mongoose = requrie('mongoose');

//schema 만들기
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength:50
    },
    email:{
        type: String,
        trim: true,//공백제거
        unique:1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//만든 schema model로 감싸기
const User = mongoose.model('User', userSchema) 

module.exports ={User}