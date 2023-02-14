import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useHistory } from '@remix-run/router';
// import { useHistory } from 'react-router-dom';

function Register() {
    // const history = useHistory()
    const navigate = useNavigate()
    const [user,setUser] = useState({
        name:"", email:"", phone:"", password:"", cpassword:""
    });

    let name, value;
    const handleInputs = (e) =>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;

        setUser({...user, [name]:value});
    };

    const PostData = async(e) => {
        e.preventDefault();
        const {name, email, phone, password, cpassword} = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email,phone,password,cpassword
            })
        });

        const data = await res.json();
        if(password!==cpassword){
            window.alert("password does not match");
        }
        else if(name==="" || email==="" || phone==="" || password==="" || cpassword===""){
            window.alert("data incomplete")
        }
        else if(data.status === 422 || !data){
            window.alert("Invalid Registration")
            console.log("Invalid Registration");
        } else{
            window.alert("Registration Successfull")
            console.log("Successfull Registration");

            // history.push("/login");
            navigate('/login')
        }
    }

  return (
    <div >
      <section className='signup'>
        <div className="container mt-5">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className='form-title'>Sign up</h2>
                <form method='POST' id='register-form' className="register-form">
                  <div className="form-group">

                    <input type="text" name='name' id='name' 
                     value={user.name}
                     onChange={handleInputs}
                     placeholder='your name' />
      
                    <input type="email" name='email' id='email' 
                     value={user.email}
                     onChange={handleInputs}
                     placeholder='enter your email' />

                    <input type="number" name='phone' id='phone' 
                     value={user.phone}
                     onChange={handleInputs}
                     placeholder='number' />
         
                    <input type="password" name='password' id='password' 
                     value={user.password}
                     onChange={handleInputs}
                     placeholder='password' />
       
                    <input type="password" name='cpassword' id='cpassword' 
                     value={user.cpassword}
                     onChange={handleInputs}
                     placeholder='Cpassword' />
      
                  </div>
                  <div className="form-group">
                    <input type="submit" name="signup" id="signup" className='form-submit'
                     value="register" onClick={PostData}/>
                  </div>
                </form>
              </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Register