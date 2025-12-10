import {type  FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../redux/slices/adminAuthSlice";
import type { AdminRootState } from "../redux/store";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { token, status, error } = useSelector(
    (state: AdminRootState) => state.adminAuth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (token) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(adminLogin({ email, password }) as any);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center text-slate-800">
          Admin Login
        </h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff2f92]"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff2f92]"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#ff2f92] text-white rounded-xl py-2 font-semibold shadow-md hover:opacity-90"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

