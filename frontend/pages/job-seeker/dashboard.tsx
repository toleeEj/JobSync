// pages/job-seeker/dashboard.tsx
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole } from "../../types";
import api from "../../utils/api";

interface DashboardData {
  profile_completion: number;
  applications_submitted: number;
  interviews_scheduled: number;
  jobs_recommended: number;
}

const JobSeekerDashboard: NextPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    if (
      user &&
      user.role !== UserRole.JOB_SEEKER &&
      user.role !== UserRole.ADMIN
    ) {
      router.push("/unauthorized");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/auth/job-seeker/dashboard/");
        setDashboardData(response.data.dashboard_data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      // Clear any pending API requests by resetting state
      setDashboardData(null);
      setLoading(false);

      // Call the logout function
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  };

  if (
    !user ||
    (user.role !== UserRole.JOB_SEEKER && user.role !== UserRole.ADMIN)
  ) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Job Seeker Dashboard</h1>
      <p>
        Welcome, {user.email} ({user.role})
      </p>

      {dashboardData && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h3>Profile Completion</h3>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#0070f3" }}
            >
              {dashboardData.profile_completion}%
            </div>
            <progress
              value={dashboardData.profile_completion}
              max="100"
              style={{ width: "100%", height: "10px" }}
            />
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h3>Applications Submitted</h3>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#0070f3" }}
            >
              {dashboardData.applications_submitted}
            </div>
            <p>Total job applications</p>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h3>Interviews Scheduled</h3>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#0070f3" }}
            >
              {dashboardData.interviews_scheduled}
            </div>
            <p>Upcoming interviews</p>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h3>Jobs Recommended</h3>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#0070f3" }}
            >
              {dashboardData.jobs_recommended}
            </div>
            <p>Based on your profile</p>
          </div>
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        <h2>Quick Actions</h2>
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button
            style={{
              padding: "10px 15px",
              background: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => router.push("/job-seeker/profile")}
          >
            Edit Profile
          </button>
          <button
            style={{
              padding: "10px 15px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => router.push("/jobs")}
          >
            Browse Jobs
          </button>
          <button
            style={{
              padding: "10px 15px",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => router.push("/job-seeker/applications")}
          >
            View Applications
          </button>
        </div>
      </div>

      <button
        onClick={handleLogout}
        disabled={logoutLoading}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          background: logoutLoading ? "#ccc" : "red",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: logoutLoading ? "not-allowed" : "pointer",
        }}
      >
        {logoutLoading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default JobSeekerDashboard;
