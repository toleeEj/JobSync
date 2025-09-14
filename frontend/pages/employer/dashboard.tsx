// pages/employer/dashboard.tsx
import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole } from "../../types";
import api from "../../utils/api";

const EmployerDashboard: NextPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      user &&
      user.role !== UserRole.EMPLOYER &&
      user.role !== UserRole.ADMIN
    ) {
      router.push("/unauthorized");
    }
  }, [user, router]);

  const handleEmployerAction = async () => {
    try {
      const response = await api.get("/auth/employer/dashboard/");
      console.log("Employer data:", response.data);
      alert("Employer action successful!");
    } catch (error) {
      console.error("Employer action failed", error);
      alert("You are not authorized to perform this action");
    }
  };

  if (
    !user ||
    (user.role !== UserRole.EMPLOYER && user.role !== UserRole.ADMIN)
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employer Dashboard</h1>
      <p>
        Welcome, {user.email} ({user.role})
      </p>
      <button onClick={handleEmployerAction} style={{ marginRight: "10px" }}>
        Perform Employer Action
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default EmployerDashboard;
