import React, { useRef, useState, useEffect } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useToast } from "../../../context/toast";

// Tạo interface để quản lý cả URL và File
interface ImageItem {
  url: string; // URL hiển thị
  file: File | null; // File thực tế (null nếu là ảnh có sẵn)
  isExisting: boolean; // Đánh dấu nếu đây là ảnh có sẵn từ initialImages
}

interface CommonImageUploaderProps {
  maxImages?: number;
  onChange?: (result: {
    files: File[];
    removedUrls: string[];
    existingUrls?: string[];
  }) => void;
  initialImages?: string[];
  fileSizeLimitMB?: number;
  size?: number;
}

const CommonImageUploader: React.FC<CommonImageUploaderProps> = ({
  maxImages = 5,
  onChange,
  initialImages = [],
  size = 60,
  fileSizeLimitMB = 2,
}) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // State để lưu thông tin đầy đủ về ảnh
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  // Theo dõi URL đã xóa để báo cho component cha
  const [removedUrls, setRemovedUrls] = useState<string[]>([]);

  // Khởi tạo state từ initialImages
  useEffect(() => {
    if (initialImages.length > 0) {
      const items: ImageItem[] = initialImages.map((url) => ({
        url,
        file: null,
        isExisting: true,
      }));
      setImageItems(items);
    }
  }, [initialImages]);

  // Thông báo sự thay đổi cho component cha
  useEffect(() => {
    if (onChange) {
      // Tách các đối tượng thành các mảng riêng biệt
      const files = imageItems
        .filter((item) => !item.isExisting && item.file) // Chỉ lấy file mới
        .map((item) => item.file as File);

      const existingUrls = imageItems
        .filter((item) => item.isExisting) // Chỉ lấy URL ảnh có sẵn được giữ lại
        .map((item) => item.url);

      onChange({ files, existingUrls, removedUrls });
    }
  }, [imageItems, removedUrls]);

  const handleClick = () => {
    if (imageItems.length >= maxImages) {
      showToast(`Chỉ được chọn tối đa ${maxImages} ảnh.`);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const remainingSlots = maxImages - imageItems.length;
      const selectedFiles = Array.from(files).slice(0, remainingSlots);

      // Kiểm tra kích thước file
      const oversizedFile = selectedFiles.find(
        (file) => file.size > fileSizeLimitMB * 1024 * 1024
      );

      if (oversizedFile) {
        showToast(
          `Tệp tin ${oversizedFile.name} quá dung lượng cho phép. Tối đa ${fileSizeLimitMB}MB.`
        );
        return;
      }

      // Tạo các đối tượng ImageItem mới
      const newItems: ImageItem[] = selectedFiles.map((file) => ({
        url: URL.createObjectURL(file),
        file: file,
        isExisting: false,
      }));

      // Cập nhật state
      setImageItems((prev) => [...prev, ...newItems]);
    }

    // Reset input để có thể chọn cùng một file nhiều lần
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleRemove = (indexToRemove: number) => {
    setImageItems((prev) => {
      const itemToRemove = prev[indexToRemove];

      if (itemToRemove.isExisting) {
        setRemovedUrls((oldUrls) => {
          if (!oldUrls.includes(itemToRemove.url)) {
            return [...oldUrls, itemToRemove.url];
          }
          return oldUrls;
        });
      }

      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      {/* Image List */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {imageItems.map((item, index) => (
          <div
            key={index}
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
              src={item.url}
              alt={`uploaded-${index}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <button
              onClick={() => handleRemove(index)}
              className="remove-button"
            >
              &times;
            </button>
            {item.isExisting && (
              <div className="existing-badge" title="Ảnh có sẵn">
                E
              </div>
            )}
          </div>
        ))}

        {imageItems.length < maxImages && (
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
      </div>

      {/* Hover style */}
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
        
        .existing-badge {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: rgba(0, 150, 0, 0.7);
          color: white;
          border: none;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          line-height: 16px;
          font-size: 10px;
          text-align: center;
        }

        .image-wrapper:hover .remove-button {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default CommonImageUploader;
