import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import axios from 'axios';
import { signIn } from 'next-auth/react'; // Thêm dòng này

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signState === "Sign Up") {
      try {
        await axios.post('/api/register', { name, email, password });
        alert('Registration successful! You can now sign in.');
        setSignState("Sign In");
      } catch (err) {
        alert(err?.response?.data?.error || 'Registration failed');
      }
    } else {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        alert('Login failed: ' + res.error);
      } else {
        alert('Login success!');
        window.location.href = '/'; // hoặc router.push('/')
      }
    }
  };

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="Netflix Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
