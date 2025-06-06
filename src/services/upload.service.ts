
import axios from 'axios';

     
export default class UploadService{
   static async upload(file: File): Promise<string> {
      if(typeof file === 'string'){
         return file;
      }
      const formData = new FormData();
      formData.append('file', file);

      try {
         const response = await axios.post('http://localhost:5220/api/upload/upload-image', formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               }
         });

         return `http://localhost:5220/api/upload/images/${response.data.data}`;
      } catch (error: any) {
         console.error('Upload error:', error);
         throw new Error(error?.response?.data?.message || 'Lỗi khi upload file');
      }
   }
}