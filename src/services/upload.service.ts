
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
     
export default class UploadService{
   static async upload(file:File): Promise<string> {
    console.log("upload", file);
    await delay(2000);
        return "url";
   }

}