// pages/login.tsx
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { LoginRequest } from "../types";

const Login: NextPage = () => {
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();
  const { login } = useAuth();

  const onSubmit = async (data: LoginRequest) => {
    try {
      setError("");
      await login(data);
      // Note: The redirect is now handled in the AuthContext
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Login</h1>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            style={{ display: "block", width: "100%", padding: "8px" }}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            style={{ display: "block", width: "100%", padding: "8px" }}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "white",
            border: "none",
          }}
        >
          Login
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <Link
          href="/register"
          style={{ color: "#0070f3", textDecoration: "underline" }}
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
