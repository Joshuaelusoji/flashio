import { useNavigate } from "react-router-dom";

export default function PageHeader({ title, subtitle, showBack = false, backTo = "/profile" }) {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex items-center justify-between">
      {showBack ? (
        <button
          onClick={() => navigate(backTo)}
          className="text-orange-600 font-semibold"
        >
          ←
        </button>
      ) : (
        <div className="w-20" />
      )}

      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>

      <div className="w-20" />
    </div>
  );
}
