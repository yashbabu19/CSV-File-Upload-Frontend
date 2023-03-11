import React from "react";

function Login({ handleLogin, email, setEmail, password, setPassword }) {
  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-label">
          
          <input
            className="login-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        <label className="login-label">
          
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        <button className="login-button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;