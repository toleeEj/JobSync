// contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import { User, UserRole, LoginRequest, RegisterRequest } from "../types";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      // Verify token is still valid
      fetchCurrentUser();
    }
    setLoading(false);
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/auth/user/");
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to fetch user data", error);
      logout();
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await api.post("/auth/login/", credentials);
      const { user: userData, access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

      // Redirect based on role
      redirectBasedOnRole(userData.role);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      const response = await api.post("/auth/register/", userData);
      const { user: newUser, access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(newUser));

      setUser(newUser);

      // Redirect based on role
      redirectBasedOnRole(newUser.role);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  };

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case UserRole.ADMIN:
        router.push("/admin/dashboard");
        break;
      case UserRole.EMPLOYER:
        router.push("/employer/dashboard");
        break;
      case UserRole.JOB_SEEKER:
      default:
        router.push("/job-seeker/dashboard");
        break;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
