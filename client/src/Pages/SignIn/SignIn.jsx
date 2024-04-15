import React from 'react'
import { Link } from "react-router-dom"
import "./signin.css"
import google from "../../assets/googleSI.png"

function SignIn() {
  return (
    <div className='signIn-container'>
      <section id='signin-form'>
        <form>
          <div className='login-heading'>
            <h1>Login</h1>
          </div>

          <div className='signin-with-google'>
            <button >
              <img src={google} />
              <p>continue with google</p>
            </button>
          </div>

          <div className='continue-with'>
            <div className="separator">
              <p> OR  </p>
            </div>
          </div>

          <div className='parent-username-field form-signin-inputs'>
            <div>
              <label htmlFor='username'>Username</label>
            </div>
            <div>
              <input
                type='email'
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
                placeholder='Enter your password'
              />
            </div>
          </div>


          <div className='signin-button'>
            <button>Continue</button>
          </div>

          <div className='dont-have-an-accnt'>
            <p>Don’t have an account, <Link to="/sign-up">Register</Link></p>
          </div>

          {/* <div className='parent-o-auth'>
                            <div className='o-auth-icons'>
                                <GoogleSI />
                                <FacebookSI />
                                <AppleSI />
                            </div>
                        </div> */}
        </form>
      </section>
    </div>
  )
}

export default SignIn