import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/thunk/jwtVerify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordTailwind: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      toast.error("Password reset error");
      setLoading(false);
      return;
    }
    try {
      // @ts-ignore
      const resultAction = await dispatch(resetPassword({ token, newPassword: password }));
      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success("Password reset successful");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorMsg = typeof resultAction.payload === 'string' && resultAction.payload
          ? resultAction.payload
          : "Password reset error";
        toast.error(errorMsg);
      }
    } catch {
      toast.error("Password reset error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-pink-600">Reset Password</h2>
        <p className="mb-6 text-gray-600">Enter your new password below to reset your account password.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-pink-400 hover:text-pink-600 text-sm"
              tabIndex={-1}
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-50"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-pink-400 hover:text-pink-600 text-sm"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword(v => !v)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <button
          type="button"
          className="mt-4 text-pink-600 hover:underline text-sm font-medium"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordTailwind;
