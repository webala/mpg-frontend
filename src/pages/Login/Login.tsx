/** @format */

import axios from "axios";
import React, { useState } from "react";
import "./Login.scss"

interface iError {
   message: string;
}

function Login() {
   const [username, setUsername] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [error, setError] = useState<iError>();

   const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const auth_data = {
         username,
         password,
      };
      let res;
      await axios
         .post("http://localhost:8000/auth/token/", auth_data, {
            headers: {
               "Content-Type": "application/json",
            },
         })
         .then((response) => {
            if (response.status === 200) {
               const data = response.data;
               localStorage.setItem("access_token", data.access);
               localStorage.setItem("refresh_token", data.refresh);
               console.log("logged in");

               axios.defaults.headers.common[
                  "Authorization"
               ] = `Bearer ${data["access"]}`;
            }
         })
         .catch((error) => {
            if (error.response.status === 500) {
               res = { message: "Server error. Please try again later" };
               setError(res);
            } else if (error.response.status === 401) {
               res = { message: "Incorrect username or password" };
               setError(res);
            } else if (
               error.response.status >= 400 &&
               error.response.status < 500
            ) {
               res = {
                  message: "Error. Please check input fields and try again",
               };
               setError(res);
            }
         });
   };

   return (
      <div className="login">
         <form onSubmit={handleSubmit} className="login-form">
            {error ? <p className="error">{error.message}</p> : null}
            <div className="heading">
               <h1>Login to your MPG account</h1>
            </div>
            <div className="field">
               <label htmlFor="username">Username</label>
               <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="John"
               />
            </div>
            <div className="field">
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="John"
               />
            </div>
            <div className="submit">
               <button type="submit">Login</button>
            </div>
         </form>
      </div>
   );
}

export default Login;
