import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-4">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-4">
          <Topbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

