import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/Login.css';

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  keepLoggedIn: boolean;
  passwordMatchError: string | null;
}

function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    keepLoggedIn: false,
    passwordMatchError: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
      passwordMatchError: name === 'confirmPassword' && formData.password !== value ? 'Passwords do not match' : null,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setFormData({
        ...formData,
        passwordMatchError: 'Passwords do not match',
      });
      return;
    }

    // Reset password match error
    setFormData({
      ...formData,
      passwordMatchError: null,
    });

    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          keepLoggedIn: formData.keepLoggedIn,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        window.location.href = '/email';
      } else {
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="rounded-circle d-flex align-items-center justify-content-center bg-light" style={{ width: '60px', height: '60px', marginBottom: '20px' }}>
          <img src="key.png" alt="Key" className="img-fluid" style={{ width: '30px', height: '30px' }} />
        </div>
        <h2>Signup</h2>
        <p className="custom-label">to get access to your Calendar</p>
        <form onSubmit={handleSubmit} style={{ width: '400px' }}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label custom-label">
              Email Address:
            </label>
            <input
            
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label custom-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label custom-label">
              Confirm Password:
            </label>
            <input
              type="password"
              className={`form-control ${formData.passwordMatchError ? 'is-invalid' : ''}`}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {formData.passwordMatchError && (
              <div className="invalid-feedback">
                {formData.passwordMatchError}
              </div>
            )}
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="keepLoggedIn"
              name="keepLoggedIn"
              checked={formData.keepLoggedIn}
              onChange={handleChange}
            />
            <label className="form-check-label custom-label" htmlFor="keepLoggedIn">
              Keep me logged in
            </label>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary btn-block mb-3" style={{ width: '400px' }}>
              Signup
            </button>
          </div>
          <div>
            <Link to="/" className="btn btn-secondary btn-block mb-3" style={{ width: '400px' }}>
              Login
            </Link>
          </div>
        </form>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <p>
          <Link to="https:" className="text-decoration-none custom-label">Terms and Conditions - Privacy</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
