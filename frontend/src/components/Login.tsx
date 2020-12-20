import React, { useState } from 'react'
import logo from '../images/login_logo.png'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    console.log(email)
    console.log(password)
  }
  return (
    <div className="container bg-white">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-6 col-sm-12 bg-white p-0">
          <img src={logo} alt="" className="w-100 float rounded" />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 px-4 bg-white flex-column d-flex align-items-center justify-content-center">
          <h3 className="mb-5">LOGIN</h3>
          <form className="w-100" onSubmit={handleLogin}>
            <div className="mb-3 ">
              <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} className="form-control" placeholder="Email" />
            </div>
            <div className="mb-3">
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="form-control" placeholder="Password" />
            </div>
            <div className="mb-3">
              <input type="submit" className="btn btn-primary w-100" value="Login" />
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login