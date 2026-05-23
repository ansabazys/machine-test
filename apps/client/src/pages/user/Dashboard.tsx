import { useAuthStore } from "@/store/auth.store";

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Welcome Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Role:</strong> {user?.role}
        </p>

        <p>
          <strong>Approved:</strong>{" "}
          {user?.isApproved ? "Yes" : "No"}
        </p>

        <p>
          <strong>Verified:</strong>{" "}
          {user?.isVerified ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;