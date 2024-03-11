import React, { useState, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormData {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    keepLoggedIn: false,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          keepLoggedIn: formData.keepLoggedIn,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        // Redirect to the home screen after successful login
        window.location.href = '/home';
      } else {
        // Handle unsuccessful login and display error message
        const errorMessage = await response.text();
        setError(errorMessage);
        // window.alert(`Login failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleSignup = () => {
    // Redirect to the signup page
    window.location.href = '/signup';
  };


  return (
    <div className="container mt-5">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="rounded-circle d-flex align-items-center justify-content-center bg-light" style={{ width: '60px', height: '60px', marginBottom: '20px' }}>
          <img src="key.png" alt="Key" className="img-fluid" style={{ width: '30px', height: '30px' }} />
        </div>
        <h2>Login</h2>
        <p className="custom-label">to get access to your Calendar</p>
        <form>
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
          <div className="d-flex justify-content-between">
            <label htmlFor="password" className="form-label custom-label">
              Password:
            </label>
            <a href="/forgot-password" className="text-decoration-none">Forgot your password?</a>
          </div>
          <div className="mb-3">
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
          <div className="mb-4 form-check">
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
            <button type="button" onClick={handleLogin} className="btn btn-primary btn-block mb-3" style={{ width: '400px' }}>
              Login
            </button>
          </div>
          {/* Display error message if login is unsuccessful */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </form>
        <div>
          <button type="button" onClick={handleSignup} className="btn btn-secondary btn-block mb-3" style={{ width: '400px' }}>
            Signup
          </button>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center fixed-bottom">
        <p>
          <a href="https:" className="text-decoration-none custom-label">Terms and Conditions - Privacy</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

