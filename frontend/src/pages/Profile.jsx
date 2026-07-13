import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAvatarSrc } from "../services/api";
import PageHeader from "../components/PageHeader";
import AvatarUpload from "../components/AvatarUpload";

export default function Profile() {
  const { user, setProfileImage } = useAuth();
  const fullName = user?.firstName
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`
    : user?.name || "Your Profile";

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="max-w-xl mx-auto px-4 py-8">
        <PageHeader
          title="Profile"
          subtitle="View your account overview and settings"
        />

        <div className="bg-white rounded-3xl shadow-sm p-8 text-center">
          <div className="mx-auto w-28 h-28 rounded-full bg-orange-100 overflow-hidden">
            <img
              src={getAvatarSrc(user)}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4">
            <AvatarUpload onUploaded={setProfileImage} />
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-gray-900">
            {fullName}
          </h1>
          {user?.email && (
            <p className="mt-2 text-sm text-gray-500">{user.email}</p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            to="/profile/payment"
            className="bg-white rounded-3xl shadow-sm p-4 text-left transition hover:-translate-y-0.5"
          >
            <h3 className="text-sm font-semibold text-gray-900">Payment account</h3>
            <p className="mt-2 text-xs text-gray-500">
              Manage your saved payment methods.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 rounded-2xl border border-orange-100 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-100">
              Go to payment
            </div>
          </Link>

          <Link
            to="/profile/details"
            className="bg-white rounded-3xl shadow-sm p-4 text-left transition hover:-translate-y-0.5"
          >
            <h3 className="text-sm font-semibold text-gray-900">Profile details</h3>
            <p className="mt-2 text-xs text-gray-500">
              Update your name and contact information.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 rounded-2xl border border-orange-100 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-100">
              Edit profile
            </div>
          </Link>

          <Link
            to="/profile/addresses"
            className="bg-white rounded-3xl shadow-sm p-4 text-left transition hover:-translate-y-0.5"
          >
            <h3 className="text-sm font-semibold text-gray-900">Addresses</h3>
            <p className="mt-2 text-xs text-gray-500">
              Manage your saved delivery locations.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 rounded-2xl border border-orange-100 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-100">
              Manage
            </div>
          </Link>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900">Payment account</h2>
            <p className="mt-2 text-sm text-gray-500">
              Manage your saved payment methods and billing preferences.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Profile details
            </h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Name</span>
                <span className="font-medium text-gray-900">{fullName}</span>
              </div>
              {user?.email && (
                <div className="flex justify-between">
                  <span>Email</span>
                  <span className="font-medium text-gray-900">{user.email}</span>
                </div>
              )}
              {user?.phone && (
                <div className="flex justify-between">
                  <span>Phone</span>
                  <span className="font-medium text-gray-900">{user.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Addresses</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Delivery addresses saved to your account.
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-dashed border-gray-200 p-4 text-sm text-gray-500">
                {user?.address || "No saved addresses yet."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}