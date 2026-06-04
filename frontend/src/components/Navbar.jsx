import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateRiderLocation } from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [locationLabel, setLocationLabel] = useState("Set location");
  const [locationLoading, setLocationLoading] = useState(true);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [manualLocation, setManualLocation] = useState("");
  const [pickerBusy, setPickerBusy] = useState(false);

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

  const useCurrentLocation = () => {
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
          setShowLocationPicker(false);
        } catch (error) {
          console.error("Current location update failed:", error);
          alert("We could not update your current location right now.");
        } finally {
          setPickerBusy(false);
        }
      },
      () => {
        alert("Please allow location access so we can use your real delivery area.");
        setPickerBusy(false);
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  const searchManualLocation = async () => {
    if (!manualLocation.trim()) {
      alert("Enter the area or address you want to use.");
      return;
    }

    setPickerBusy(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(manualLocation)}`
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
      setShowLocationPicker(false);
      setManualLocation("");
    } catch (error) {
      console.error("Manual location search failed:", error);
      alert("We could not find that location. Please try another address.");
    } finally {
      setPickerBusy(false);
    }
  };

  return (
    <nav className="sticky w-full top-0 z-[100] bg-[#605c5c] px-5 py-4 shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        <div className="relative flex items-center gap-3 text-white min-w-0">
          <button
            type="button"
            onClick={() => setShowLocationPicker((prev) => !prev)}
            className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-left text-sm font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            <span className="text-base">📍</span>
            <span className="truncate max-w-[220px] sm:max-w-[320px]">
              {locationLoading ? "Detecting location..." : locationLabel}
            </span>
          </button>

          {showLocationPicker && (
            <div className="absolute left-0 top-full mt-2 w-[320px] rounded-2xl border border-white/10 bg-[#4f4a4a] p-3 text-sm text-white shadow-xl z-[110]">
              <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-amber-200">Choose delivery area</p>
              <input
                type="text"
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                placeholder="Type an address or area"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 outline-none focus:border-amber-300"
              />
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={searchManualLocation}
                  disabled={pickerBusy}
                  className="flex-1 rounded-xl bg-amber-400 px-3 py-2 font-semibold text-[#4f4a4a] disabled:opacity-60"
                >
                  {pickerBusy ? "Searching..." : "Use this location"}
                </button>
                <button
                  type="button"
                  onClick={useCurrentLocation}
                  disabled={pickerBusy}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 font-semibold text-white disabled:opacity-60"
                >
                  {pickerBusy ? "Working..." : "Use current"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:inline text-[13px] font-semibold text-white">
                Hi, <span className="text-amber-300">{user.firstName}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-transparent border border-white/30 text-white text-[13px] font-bold px-4 py-[7px] rounded-[10px] cursor-pointer transition-all hover:border-red-400 hover:text-red-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-transparent border border-amber-400 text-amber-200 text-[13px] font-bold px-4 py-[7px] rounded-[10px] cursor-pointer transition-all hover:bg-amber-400 hover:text-[#605c5c]"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-amber-400 border border-amber-400 text-[#605c5c] text-[13px] font-bold px-4 py-[7px] rounded-[10px] cursor-pointer transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}