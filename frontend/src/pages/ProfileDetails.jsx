import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

export default function ProfileDetails() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="max-w-xl mx-auto px-4 py-8">
        <PageHeader
          title="Profile details"
          subtitle="Update your account information"
          showBack
        />

        <div className="bg-white rounded-3xl shadow-sm p-8">
          <p className="mt-2 text-sm text-gray-500">
            Update your name, email, and contact information.
          </p>

          <div className="mt-6 space-y-4 text-sm text-gray-700">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">Name</p>
              <p>{user?.firstName ? `${user.firstName} ${user.lastName || ""}` : user?.name || "Not set"}</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">Email</p>
              <p>{user?.email || "Not set"}</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">Phone</p>
              <p>{user?.phone || "Not set"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
