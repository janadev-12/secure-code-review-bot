import React from "react";
import LoginForm from "../components/LoginForm.jsx";

const Login = () => {
  const handleLogin = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...formData,

          typingSpeed: 80,
          mouseMovement: true,
          loginAttempts: 1,
          deviceChanged: false,

          failedAttempts: 0,
          newDevice: false,
          newLocation: false,
          suspiciousIP: false,

          requestCount: 10,
          clickSpeed: 50,
          userAgent: navigator.userAgent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isAuthenticated", "true");

        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("aiSecurity", JSON.stringify(data.aiSecurity));

        alert("✅ Login Successful");

        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="login-page">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;