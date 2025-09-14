// pages/register.tsx
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import { RegisterRequest, UserRole } from "../types";

const Register: NextPage = () => {
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterRequest>();
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const password = watch("password");

  const onSubmit = async (data: RegisterRequest) => {
    try {
      setError("");
      await registerUser(data);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Register</h1>
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
          <label>Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            style={{ display: "block", width: "100%", padding: "8px" }}
          >
            <option value={UserRole.JOB_SEEKER}>Job Seeker</option>
            <option value={UserRole.EMPLOYER}>Employer</option>
          </select>
          {errors.role && (
            <span style={{ color: "red" }}>{errors.role.message}</span>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            style={{ display: "block", width: "100%", padding: "8px" }}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register("password2", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            style={{ display: "block", width: "100%", padding: "8px" }}
          />
          {errors.password2 && (
            <span style={{ color: "red" }}>{errors.password2.message}</span>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
          }}
        >
          Register
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Already have an account? <Link href="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
