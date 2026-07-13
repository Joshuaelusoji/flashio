// src/components/AvatarUpload.jsx
import { useState, useRef } from "react";
import { uploadAvatarPhoto, getAvatarSrc } from "../services/api";

export default function AvatarUpload({ user, onUploaded }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const displaySrc = preview || getAvatarSrc(user);

  const handleAvatarClick = () => {
    if (!user || uploading) return; // logged-out users can't upload
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setPreview(URL.createObjectURL(selected));
    setUploading(true);

    const result = await uploadAvatarPhoto(selected);

    setUploading(false);
    if (result.success) {
      onUploaded?.(result.data.profileImageUrl);
    } else {
      alert(result.message || "Upload failed");
      setPreview(null); // revert preview if upload failed
    }

    e.target.value = ""; // allow re-selecting the same file again later
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleAvatarClick}
        disabled={!user || uploading}
        aria-label={user ? "Change profile photo" : "Profile avatar"}
        className="relative mx-auto w-28 h-28 rounded-full bg-orange-100 overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-default"
      >
        <img
          src={displaySrc}
          alt="Profile avatar"
          className="w-full h-full object-cover"
        />

        {user && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition flex items-center justify-center opacity-0 hover:opacity-100">
            <span className="text-white text-xs font-semibold">
              {uploading ? "Uploading..." : "Change"}
            </span>
          </div>
        )}
      </button>

      {user && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      )}
    </div>
  );
}