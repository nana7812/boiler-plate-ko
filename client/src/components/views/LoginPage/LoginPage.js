import React,{useState} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {loginUser} from '../../../_actions/user_action'

function LoginPage(props) {
    
    const dispatch = useDispatch();
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const OnEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const OnPasswordHandler =(event) =>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        let body ={
            email: Email,
            password:Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess){
                props.history.push('/')//성공을 하면 루트 페이지로 이동
            }else{
                alert('Error')
            }
        })

       // dispatch(loginUser(body))
        
        /*axios.post('api/user/login',body)
            .then(response =>{

            })*/
    }
       return (
        <div style ={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'
        }}>
          <form style ={{display:'flex',flexDirection:'column'}}
                onSubmit ={onSubmitHandler}
          >
              <label>Email</label>
              <input type ="email" value ={Email} onChange ={OnEmailHandler}/> 
              <label>Password</label>
              <input type ="password" value ={Password} onChange ={OnPasswordHandler}/>
              <br/>
              <botton>
                  Login
              </botton>
          </form>      
        </div>
       )
}

export default withRouter(LoginPage)