
import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import '../custom.css'
const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneno: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setForm({ ...form, [name]: value.replace(/\s/g, '') });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneCheck = /^[0-9]{10}$/;

    if (!form.username.trim()) {
      newErrors.username = 'Username cannot be empty.';
    }
   if (!emailCheck.test(form.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (form.password.length < 8) {
      newErrors.password = 'Password should be at least 8 characters.';
    }
    if (!phoneCheck.test(form.phoneno)) {
      newErrors.phoneno = 'Please enter a 10-digit phone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/')
      
      alert("Sign Up successfully");
    }
  };

  const userRef = useRef(null);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);
  return (
    <>
    <div >
      <div className='bg-img'>
        <div className='signup-card'>
        <div>
          <h1 className='signup-head'>SIGNUP</h1>
          </div>
          <form onSubmit={submitHandler} autoComplete='off'>
            <div  className='form-inputs'>
          <input className='input-box'
            type='text' name='username' value={form.username} placeholder='Username' ref={userRef} onChange={handleChange} />
             <p className='err-msg'>{errors.username}</p>
          <input  className='input-box' type='email' name='email' placeholder='Email' value={form.email} onChange={handleChange} />
          <p className='err-msg'>{errors.email}</p>
          <input  className='input-box' type='tel' name='phoneno' value={form.phoneno} pattern="[0-9]*" placeholder='Phone Number' onChange={handleChange}/>
          <p className='err-msg'>{errors.phoneno}</p>
          
          <input  className='input-box'  placeholder='Create Password' type='password' name='password' value={form.password}  onChange={handleChange}/>
          <p className='err-msg'>{errors.password}</p>
          <button className='signup-button'>Sign Up</button>  
          </div>
          </form>
        
        </div> 
        
      </div>
       
    </div>
    </>
  )
}

export default SignUp