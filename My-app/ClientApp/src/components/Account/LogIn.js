import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {

    const users =[{
        email:"chinku@gmail.com",
        phoneno:"7680908014",
        password:"12345678"
    }];
  const [login, setLogin] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneCheck = /^[0-9]{10}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!emailCheck.test(login.identifier) && !phoneCheck.test(login.identifier)) {
      newErrors.identifier = 'Please enter a valid email address or phone number (10 digits).';
    }

    if (login.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const user = users.find(
        (user) =>
          (user.email === login.identifier || user.phoneno === login.identifier) &&
          user.password === login.password
      );

      if (user) {
        navigate('/');
      } else {
        setErrors({ identifier: 'Invalid email/phone number or password.' });
      }
    }
  };

  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.focus();
    }
  }, []);
  const handleToSignUp =(e)=>{
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className='bg_l'>
      <div className='log_card'>
        <h1 className='login-head'>LOG IN</h1>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <div className='form-inputs'>
            <input
              className='input-bo'
              type='text'
              name='identifier'
              placeholder='Email or Phone Number'
              // value={login.identifier}
              defaultValue={Email}
              onChange={(e) => setEmail(e.target.value)}
              ref={logRef}
            />
            {errors.identifier && <p className='err-msglog'>{errors.identifier}</p>}

            <input
              className='input-bo'
              type='password'
              name='password'
              placeholder='Password'
              defaultValue={password}
              // value={login.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className='err-msglog'>{errors.password}</p>}

            <button className='signup-button' type='submit'>Log In</button>
          </div>
        </form>
        <p className='no_acc'>Don't have an Account? <span onClick={handleToSignUp} className='reg-now'>Register Now</span></p>
      </div>
    </div>
  );
};

export default LogIn;
