import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Login() { 
    const navigate = useNavigate()
    const [email,setEmail]= useState('');
    const [password,setPassword] = useState('');

    const loginUser= async (e) => {
      e.preventDefault();

      const res = await fetch('./login', {
        method:"POST",   
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = res.json();
      if(res.status ===400 || !data){
        window.alert("Inavalid Credentials");
      }
      else if(!email ||!password){
        window.alert("Fill the complete values");
      }
      else{
        window.alert("Login Successfull")
        navigate('/')
      }
    }



  return (
    <div>
      <NavLink to="/register" className="">Create an account</NavLink>
      <h2>Sign in</h2>
      <form method='POST' className="register-form">     
        <input type="email" name='email' id='email' placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
        <input type="password" name="password" id="password" placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
        <input type="submit" name="signin" id="signin" className='form-submit' value="Log in"
            onClick={loginUser}
         />
      </form>
    </div>
  )
}

export default Login