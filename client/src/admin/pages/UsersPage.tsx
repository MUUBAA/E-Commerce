import { useEffect, useState } from "react";
import adminApi from "../services/api";
import DataTable from "../components/DataTable";
import type { AdminUser } from "../types";

const UsersPage = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);

  const load = async () => {
    const { data } = await adminApi.get("/admin/users");
    setUsers(data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleBlock = async (user: AdminUser) => {
    await adminApi.patch(`/admin/users/${user.id}/block`, {
      block: !user.isBlocked,
    });
    load();
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">Users</h3>
      <DataTable
        columns={[
          { header: "Name", accessor: "name" },
          { header: "Email", accessor: "email" },
          { header: "Role", accessor: "role" },
          { header: "Blocked", accessor: (u) => (u.isBlocked ? "Yes" : "No") },
          {
            header: "Action",
            accessor: (u) => (
              <button
                onClick={() => toggleBlock(u)}
                className="px-3 py-1 bg-slate-100 rounded-lg text-xs"
              >
                {u.isBlocked ? "Unblock" : "Block"}
              </button>
            ),
          },
        ]}
        data={users}
      />
    </div>
  );
};

export default UsersPage;

