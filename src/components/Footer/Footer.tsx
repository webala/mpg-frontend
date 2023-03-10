/** @format */

import React from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import logo from "../../assets/logo.jpg";
import "./Footer.scss";

function Footer() {
   return (
      <div className="footer">
         <div className="logo">
            <img src={logo} alt="logo" />
            <h1>Contact us</h1>
            <div className="socials">
               <a href="#">
                  <BsFacebook />
               </a>
               <a href="#">
                  <BsInstagram />
               </a>
               <a href="#">
                  <BsTwitter />
               </a>
            </div>
            <div className="contact">
               <a href="#">
                  <BsWhatsapp />
                  <p>+24538293873</p>
               </a>
               <a href="#">
                  <MdEmail />
                  <p>mpg@email.com</p>
               </a>
            </div>
         </div>
         <div className="links">
            <a href="#">About MPG</a>
            <a href="#">Contact</a>
            <a href="#">Terms of service</a>
            <a href="#">Refund policy</a>
         </div>
         <div className="form">
            <h1>
               Subscribe to our newsletter to get the latest updates and deals.
            </h1>
            <form action="#">
               <div className="field name">
                  <label htmlFor="name">Your Name</label>
                  <div className="inputs">
                     <input type="text" placeholder="John" />
                     <input type="text" placeholder="Doe" />
                  </div>
               </div>
               <div className="field">
                  <label htmlFor="email">Email</label>
                  <input type="email" placeholder="john@email.com" />
               </div>
               <div className="field">
                  <label htmlFor="phone">Phone number</label>
                  <input type="email" placeholder="+254789765378" />
               </div>
               <div className="submit">
                  <button type="submit">Subscribe</button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default Footer;
