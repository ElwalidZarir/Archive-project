import React from "react";

const Login = () => {
  return (
    <div className="face face-front">
      <div className="content">
        <h2>Sign in</h2>
        <form>
          <div className="field-wrapper">
            <input type="text" name="username" placeholder="username" />
            <label>username</label>
          </div>
          <div className="field-wrapper">
            <input type="password" name="password" placeholder="password" />
            <label>password</label>
          </div>
          <div className="field-wrapper">
            <input type="submit" />
          </div>
          <span className="psw">Forgot Password? </span>
          <span className="signup">Not a user? Sign up</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
