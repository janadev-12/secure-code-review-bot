import React, { useState } from "react";

const Register = () => {

  const [formData, setFormData] = useState({
    username: "",
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


  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // Success
      if (response.ok) {

        alert("✅ Registration Successful");

        window.location.href = "/login";

      } else {

        alert(data.message || "Registration Failed");
      }

    } catch (error) {

      console.error(error);

      alert("Server Error");
    }
  };


  return (
    <div className="register-container">

      <form
        className="register-form"
        onSubmit={handleRegister}
      >

        <h2>
          AI Secure Register
        </h2>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

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
          Register
        </button>

      </form>
    </div>
  );
};

export default Register;