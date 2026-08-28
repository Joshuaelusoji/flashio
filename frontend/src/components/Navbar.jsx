import { useEffect, useState } from "react";
import { MapPin, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateRiderLocation } from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [locationLabel, setLocationLabel] = useState("Set location");
  const [locationLoading, setLocationLoading] = useState(true);
  const [pickerBusy, setPickerBusy] = useState(false);
  const [manualLocation, setManualLocation] = useState("");
  const [showLocationInput, setShowLocationInput] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/menu");
  };

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationLabel(user?.address || "Set location");
      setLocationLoading(false);
      return;
    }

    const fallbackLabel = user?.address || "Use current location";
    setLocationLabel(fallbackLabel);

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          if (user?.role === "RIDER") {
            await updateRiderLocation(latitude, longitude);
          }

          const reverseRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          if (!reverseRes.ok) {
            throw new Error("Reverse geocode failed");
          }

          const data = await reverseRes.json();
          const area =
            data?.address?.suburb ||
            data?.address?.city ||
            data?.address?.town ||
            data?.display_name ||
            fallbackLabel;

          setLocationLabel(area);
        } catch (error) {
          console.warn("Location lookup failed:", error);
          setLocationLabel(fallbackLabel);
        } finally {
          setLocationLoading(false);
        }
      },
      () => {
        setLocationLabel(user?.address || "Set location");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [user]);

  const handleLocationClick = () => {
    setShowLocationInput(true);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      alert("Geolocation is not supported in this browser.");
      return;
    }

    setPickerBusy(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          if (user?.role === "RIDER") {
            await updateRiderLocation(latitude, longitude);
          }

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error("Location lookup failed");
          }

          const data = await response.json();
          const area =
            data?.address?.suburb ||
            data?.address?.city ||
            data?.address?.town ||
            data?.display_name ||
            "Current location";

          setLocationLabel(area);
        } catch (error) {
          console.error("Current location update failed:", error);
          alert("We could not detect your current location right now.");
        } finally {
          setPickerBusy(false);
        }
      },
      () => {
        setPickerBusy(false);
        alert("Please allow location access so we can detect your area.");
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  const searchManualLocation = async () => {
    if (!manualLocation.trim()) {
      alert("Enter an address or area to use.");
      return;
    }

    setPickerBusy(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(manualLocation)}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      const result = data?.[0];

      if (!result) {
        throw new Error("No matching location found");
      }

      setLocationLabel(result.display_name);
      setManualLocation("");
    } catch (error) {
      console.error("Manual location search failed:", error);
      alert("We could not find that location. Please try another address.");
    } finally {
      setPickerBusy(false);
    }
  };

  return (
    <nav className="sticky top-0 z-[100] bg-amber-500 p-1 shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        <div className="relative flex flex-1 items-center gap-3 text-black min-w-0">
          <button
            type="button"
            onClick={handleLocationClick}
            disabled={pickerBusy}
            aria-label="Detect current location"
            title="Detect current location"
            className="rounded-full bg-white/40 p-2 text-gray-500 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            <MapPin size={18} />
          </button>

          {showLocationInput && (
            <div className="absolute left-0 top-full mt-3 w-[320px] rounded-2xl border border-white/10 bg-[#4f4a4a] p-3 text-sm text-gray-500 shadow-xl z-[110]">
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-amber-200">Manual location</p>
              <input
                type="text"
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchManualLocation()}
                placeholder="Enter your address or area"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-gay-500 placeholder:text-white/60 outline-none focus:border-amber-300"
              />
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={searchManualLocation}
                  disabled={pickerBusy}
                  className="flex-1 rounded-xl bg-amber-400 px-3 py-2 font-semibold text-[#4f4a4a] disabled:opacity-60"
                >
                  {pickerBusy ? "Working..." : "Use this location"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowLocationInput(false)}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 font-semibold text-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:inline text-[13px] font-semibold text-gray-500">
                Hi, <span className="text-amber-300">{user.firstName}</span>
              </span>
             <button
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
                className="bg-transparent border border-white/30 text-white p-2 rounded-full cursor-pointer transition-all hover:border-red-400 hover:text-red-200"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
            <button
              onClick={() => navigate("/profile")}
              aria-label="Profile"
              title="Profile"
              className="bg-transparent border border-white/30 text-white p-2 rounded-full cursor-pointer transition-all hover:border-amber-300 hover:text-amber-200"
            >
              <User className="text-gray-500" size={18} />
            </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}