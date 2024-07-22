import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneno: ""
  });

  const [errors, setErrors] = useState({});
  const userRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.replace(/\s/g, '') });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneCheck = /^[0-9]{10}$/;
    let error = '';

    switch (name) {
      case 'username':
        if (!value.trim()) error = 'Username cannot be empty.';
        break;
      case 'email':
        if (!emailCheck.test(value)) error = 'Please enter a valid email.';
        break;
      case 'password':
        if (value.length < 8) error = 'Password should be at least 8 characters.';
        break;
      case 'phoneno':
        if (!phoneCheck.test(value)) error = 'Please enter a 10-digit phone number.';
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

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

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validate()) return;

    let formData = new FormData();
    formData.append("name", form.username);
    formData.append("Email", form.email);
    formData.append("phone", form.phoneno);
    formData.append("password", form.password);

    fetch("api/account/signup", {
      method: "POST",
      body: formData
    })
      .then(response => response.text()) // Adjust this based on your expected response type (text, json, etc.)
      .then(data => {
        alert(data);
        // Handle success - maybe display a message or redirect
      })
      .catch(error => {
        console.error("Error:", error);
        // Handle error - maybe display an error message
      });
      
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const handleLogIn = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div>
      <div className='bg-img'>
        <div className='signup-card'>
          <div>
            <h1 className='signup-head'>SIGNUP</h1>
          </div>
          <form onSubmit={submitHandler} autoComplete='off'>
            <div className='form-inputs'>
              <input className='input-box'
                type='text' name='username' value={form.username} placeholder='Username' ref={userRef} onChange={handleChange} />
              <p className='err-msg'>{errors.username}</p>
              <input className='input-box' type='email' name='email' placeholder='Email' value={form.email} onChange={handleChange} />
              <p className='err-msg'>{errors.email}</p>
              <input className='input-box' type='tel' name='phoneno' value={form.phoneno} pattern="[0-9]*" placeholder='Phone Number' onChange={handleChange} />
              <p className='err-msg'>{errors.phoneno}</p>
              <input className='input-box' placeholder='Create Password' type='password' name='password' value={form.password} onChange={handleChange} />
              <p className='err-msg'>{errors.password}</p>
              <button className='signup-button'>Sign Up</button>
            </div>
          </form>
          <p className='no_acc'>Already have an Account ? <span onClick={handleLogIn} className='reg-now'>LogIn Now</span></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
