export function formatDateOnly(isoDateStr: string): string {
    const date = new Date(isoDateStr);
  
    // Nếu ngày không hợp lệ (do năm quá nhỏ), xử lý thủ công
    if (isNaN(date.getTime())) {
      const [datePart] = isoDateStr.split("T");
      const [year, month, day] = datePart.split("-");
      return `${day}/${month}/${year}`;
    }
  
    // Format ngày mà không có giờ
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  