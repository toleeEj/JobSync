// pages/admin/dashboard.tsx
import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole } from "../../types";
import api from "../../utils/api";

const AdminDashboard: NextPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== UserRole.ADMIN) {
      router.push("/unauthorized");
    }
  }, [user, router]);

  const handleAdminAction = async () => {
    try {
      const response = await api.get("/auth/admin/dashboard/");
      console.log("Admin data:", response.data);
      alert("Admin action successful!");
    } catch (error) {
      console.error("Admin action failed", error);
      alert("You are not authorized to perform this action");
    }
  };

  if (!user || user.role !== UserRole.ADMIN) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.email} (Admin)</p>
      <button onClick={handleAdminAction} style={{ marginRight: "10px" }}>
        Perform Admin Action
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
