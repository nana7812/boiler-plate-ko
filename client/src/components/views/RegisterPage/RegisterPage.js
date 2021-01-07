import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { registerUser } from '../../../_actions/user_action';

import{withRouter} from 'react-router-dom';

function RegisterPage(props) {

    const dispatch = useDispatch();
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const OnEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const OnNameHandler =(event) =>{
        setName(event.currentTarget.value)
    }
    const OnPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const OnConfirmPasswordHandler =(event) =>{
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) =>{
        event.preventDefault();

        if(Password !== ConfirmPassword){ 
            return alert('비밀번호와 비밀번호 확인은 같아야합니다')
        }
        let body ={
            email: Email,
            password:Password,
            name:Name
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
                props.history.push("/login")
            }else{
                alert("Fail")
            }
        })
    }
    return (
        <div style ={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'
        }}>
          <form style ={{display:'flex',flexDirection:'column'}}
                onSubmit ={onSubmitHandler}
          >
              <label>Email</label>
              <input type ="email" value ={Email} onChange ={OnEmailHandler}/> 
              <label>Name</label>
              <input type ="text" value ={Name} onChange ={OnNameHandler}/>
              <label>Password</label>
              <input type ="Password" value ={Password} onChange ={OnPasswordHandler}/> 
              <label>Confirm password</label>
              <input type ="ConfirmPassword" value ={ConfirmPassword} onChange ={OnPasswordHandler}/>
              <br/>
              <botton>
                  회원가입
              </botton>
          </form>      
        </div>
    )
}

export default withRouter(RegisterPage)