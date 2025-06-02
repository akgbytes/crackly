import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

interface AvatarUploadProps {
  image: File | null;
  onChange: (file: File | null) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ image, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleRemoveImage = () => {
    onChange(null);
  };

  return (
    <div className="flex justify-center mb-8">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          className="w-20 h-20 flex items-center justify-center bg-red-50 text-red-400 rounded-full relative cursor-pointer border border-rose-200"
          onClick={() => inputRef.current?.click()}
        >
          <LuUser className="text-4xl" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-300 text-white rounded-full absolute -bottom-1 -right-1"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl || ""}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border border-rose-200"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
