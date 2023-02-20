/** @format */

import axios from "axios";
import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

interface iError {
   message: string;
}

function Register() {
   const [error, setError] = useState<iError>();
   const [firstName, setFirstName] = useState<string>();
   const [lastName, setLastName] = useState<string>();
   const [username, setUsername] = useState<string>();
   const [password1, setPassword1] = useState<string>();
   const [password2, setPassword2] = useState<string>();
   const [email, setEmail] = useState<string>();

   const navigate = useNavigate()

   const handleSubmit = async (e:React.SyntheticEvent) => {
      e.preventDefault()
      const userData = {
         first_name: firstName,
         last_name: lastName,
         username,
         password1,
         password2,
         email
      }
      if (password1 !== password2) {
         const error = {message: 'The two password fields must match'}
         setError(error)
         return;
      }

      let res;
      await axios
         .post("http://localhost:8000/auth/register/", userData, {
            headers: {
               "Content-Type": "application/json",
            },
         })
         .then((response) => {
            if (response.status >= 200 && response.status < 300) {
               res = { message: "Success" };
               console.log('registered.')
               navigate('/login')
            }
         })
         .catch((error) => {
            if (error.response.status === 500) {
               res = { message: "Server error. Please try again later" };
               setError(res);
            } else if (error.response.status === 400) {
               res = { message: "Username or email already in use." };
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
      <div className="register">
         <form onSubmit={handleSubmit} className="register-form">
            {error ? <p className="error">{error.message}</p> : null}
            <div className="heading">
               <h1>Create an MPG account</h1>
            </div>
            <div className="field">
               <label htmlFor="first name">First name</label>
               <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
               />
            </div>
            <div className="field">
               <label htmlFor="last name">Last name</label>
               <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
               />
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
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="John"
               />
            </div>
            <div className="field">
               <label htmlFor="password1">Password</label>
               <input
                  type="password"
                  onChange={(e) => setPassword1(e.target.value)}
               />
            </div>
            <div className="field">
               <label htmlFor="password2">Confirm password</label>
               <input
                  type="password"
                  onChange={(e) => setPassword2(e.target.value)}
               />
            </div>
            <div className="submit">
               <button type="submit">Create account</button>
            </div>
         </form>
      </div>
   );
}

export default Register;
