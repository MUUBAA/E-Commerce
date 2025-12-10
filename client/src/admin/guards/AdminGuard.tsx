import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import type { JSX } from "react";

type Props = {
  children: JSX.Element;
};

type JwtPayload = {
  exp: number;
  role?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
};

const AdminGuard = ({ children }: Props) => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  try {
    const payload = jwtDecode<JwtPayload>(token);
    const role =
      payload.role ||
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired || role?.toLowerCase() !== "admin") {
      localStorage.removeItem("adminToken");
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  } catch {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }
};

export default AdminGuard;

