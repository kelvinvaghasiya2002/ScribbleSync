import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import "./signin.css"
import axios from "axios"
import { useUserInfo } from "../../contexts/user.jsx"
import GoogleSI from './GoogleSI.jsx'
const server = import.meta.env.VITE_SERVER;

function SignIn() {
  const { setContextUser, ContextUser, setloggedIn, loggedIn } = useUserInfo();
  console.log(ContextUser);
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setLoading] = useState(false);
  console.log(userData);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    const button = document.getElementById("signInButton");
    button.setAttribute("disabled", "")

    try {

      const response = await axios.get(`${server}/login`, {
        headers: {
          email: userData.email,
          password: userData.password
        }
      })

      alert(response.data.success);
      setContextUser(response.data.user);
      setloggedIn(true);
      setLoading(false)
      localStorage.setItem("_session", response.data.token);
      button.removeAttribute("disabled")

    } catch (error) {

      alert(error.response.data.error);
      setLoading(false)
      button.removeAttribute("disabled")

    }
  }


  return (
    <div className='signIn-container'>
      <section id='signin-form'>
        <form>
          <div className='login-heading'>
            <h1>Login</h1>
          </div>


          <GoogleSI />

          <div className='continue-with'>
            <div className="separator">
              <p> OR  </p>
            </div>
          </div>

          <div className='parent-username-field form-signin-inputs'>
            <div>
              <label htmlFor='username'>Email</label>
            </div>
            <div>
              <input
                type='email'
                name='email'
                value={userData.email}
                onChange={handleChange}
                placeholder='Enter your email'
              />
            </div>
          </div>


          <div className='parent-password-field form-signin-inputs'>
            <div>
              <label htmlFor='password'>Password</label>
            </div>
            <div>
              <input
                type='password'
                name='password'
                value={userData.password}
                onChange={handleChange}
                placeholder='Enter your password'
              />
            </div>
          </div>


          <div className='signin-button'>
            <button id='signInButton' onClick={handleSubmit}>
              {
                isLoading ? <div className="parent-loading"><div className="loader"></div></div>
                  : <>Sign In</>
              }
            </button>
          </div>

          <div className='dont-have-an-accnt'>
            <p>Don’t have an account, <Link to="/sign-up">Register</Link></p>
          </div>

        </form>
      </section>
      {
        loggedIn && <Navigate to="/" replace={true} />
      }
    </div>
  )
}

export default SignIn