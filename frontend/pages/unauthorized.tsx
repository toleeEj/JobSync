// pages/unauthorized.tsx
import { NextPage } from "next";
import Link from "next/link";

const Unauthorized: NextPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Unauthorized Access</h1>
      <p>You don't have permission to access this page.</p>
      <Link href="/">
        <a style={{ color: "#0070f3", textDecoration: "underline" }}>
          Return to Home
        </a>
      </Link>
    </div>
  );
};

export default Unauthorized;
