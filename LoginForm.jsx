import React, { useState } from "react";

const LoginForm = ({ onSubmit }) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  };


  return (
    <div className="login-form-container">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <h2>AI Secure Login</h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Submit */}
        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
};

export default LoginForm;