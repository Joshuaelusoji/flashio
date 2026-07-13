// src/components/AvatarUpload.jsx
import { useState } from "react";
import { uploadAvatarPhoto } from "../services/api";

export default function AvatarUpload({ onUploaded }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const result = await uploadAvatarPhoto(file);

    setUploading(false);
    if (result.success) {
      onUploaded?.(result.data.profileImageUrl);
      setFile(null);
      setPreview(null);
    } else {
      alert(result.message || "Upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {preview && (
        <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
      )}

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {file && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-amber-400 text-[#4f4a4a] font-semibold px-4 py-2 rounded-xl disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Save photo"}
        </button>
      )}
    </div>
  );
}