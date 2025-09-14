// pages/index.tsx
import { NextPage } from "next";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Job Portal</h1>
      {user ? (
        <div>
          <p>
            Hello, {user.email}! You are logged in as a {user.role}.
          </p>
          <div style={{ marginTop: "20px" }}>
            <Link
              href={`/${user.role}/dashboard`}
              style={{
                marginRight: "15px",
                color: "#0070f3",
                textDecoration: "underline",
              }}
            >
              Go to Dashboard
            </Link>
            <Link
              href="/logout"
              style={{ color: "#0070f3", textDecoration: "underline" }}
            >
              Logout
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p>Please log in or register to continue.</p>
          <div style={{ marginTop: "20px" }}>
            <Link
              href="/login"
              style={{
                marginRight: "15px",
                color: "#0070f3",
                textDecoration: "underline",
              }}
            >
              Login
            </Link>
            <Link
              href="/register"
              style={{ color: "#0070f3", textDecoration: "underline" }}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
