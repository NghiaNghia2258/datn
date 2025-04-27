import React, { useRef, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useToast } from "../../../context/toast";

interface SingleImageUploaderProps {
  onChange?: (image: File | null) => void;
  initialImage?: string | null;
  fileSizeLimitMB?: number;
  size?: number;
}

const SingleImageUploader: React.FC<SingleImageUploaderProps> = ({
  onChange,
  initialImage = null,
  size = 60,
  fileSizeLimitMB = 2,
}) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(initialImage);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > fileSizeLimitMB * 1024 * 1024) {
        showToast(
          `Tệp tin ${file.name} quá dung lượng cho phép. Tối đa ${fileSizeLimitMB}MB.`
        );
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onChange?.(file);
    }
  };

  const handleRemove = () => {
    setImage(null);
    onChange?.(null);
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      {/* Image or Upload Box */}
      {image ? (
        <div
          style={{
            position: "relative",
            width: size,
            height: size,
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid #ddd",
          }}
          className="image-wrapper"
        >
          <img
            src={image}
            alt="uploaded"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <button onClick={handleRemove} className="remove-button">
            &times;
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          style={{
            width: size,
            height: size,
            border: "2px dashed #ccc",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9f9f9",
            flexShrink: 0,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          className="upload-box"
        >
          <AddPhotoAlternateIcon color="info" />
        </div>
      )}

      {/* Styles */}
      <style>{`
        .upload-box:hover {
          transform: scale(1.02);
          border-color: #999;
        }
        
        .remove-button {
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .image-wrapper:hover .remove-button {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default SingleImageUploader;
