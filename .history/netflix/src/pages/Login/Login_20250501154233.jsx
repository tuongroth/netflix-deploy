import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (event) => {
    event.preventDefault();
    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="Netflix Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder='Your name'
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder='Email'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder='Password'
          />
          <button type='submit'>{signState}</button>
        </form>
        <div className="form-help">
          <div className="remember">
            <input type="checkbox" />
            <label>Remember Me</label>
          </div>
        </div>
        <p onClick={() => setSignState(signState === "Sign In" ? "Sign Up" : "Sign In")}>
          {signState === "Sign In"
            ? "New to Netflix? Sign Up"
            : "Already have an account? Sign In"}
        </p>
      </div>
    </div>
  );
};

export default Login;
