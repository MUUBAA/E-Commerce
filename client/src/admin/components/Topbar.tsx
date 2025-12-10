import { useDispatch } from "react-redux";
import { adminLogout } from "../redux/slices/adminAuthSlice";

const Topbar = () => {
  const dispatch = useDispatch();
  return (
    <header className="flex items-center justify-between bg-white shadow-md rounded-2xl px-6 py-3">
      <div className="font-semibold text-lg text-slate-800">Quick Commerce Admin</div>
      <button
        className="px-4 py-2 bg-[#ff2f92] text-white rounded-xl shadow hover:opacity-90"
        onClick={() => dispatch(adminLogout())}
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;

