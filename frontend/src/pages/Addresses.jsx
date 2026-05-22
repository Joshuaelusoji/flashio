import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

export default function Addresses() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const addresses = user?.addresses || [user?.address].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="max-w-xl mx-auto px-4 py-8">
        <PageHeader
          title="Addresses"
          subtitle="Manage your saved delivery locations"
          showBack
        />

        <div className="bg-white rounded-3xl shadow-sm p-8">
          <p className="mt-2 text-sm text-gray-500">
            Manage your saved delivery locations.
          </p>

          <div className="mt-6 space-y-4">
            {addresses.length > 0 ? (
              addresses.map((address, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-gray-200 bg-gray-50 p-4"
                >
                  <p className="font-semibold text-gray-900">Address {index + 1}</p>
                  <p>{address}</p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
                No saved addresses yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
