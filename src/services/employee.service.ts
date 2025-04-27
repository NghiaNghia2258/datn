import { EmployeeCreateSchema, EmployeeUpdateSchema } from "../features/A/create-update-employee/zod";
import { RequestGetALlEmployees } from "./request/employee.request";
import { ResponseGetAllEmployees } from "./response/employee.response";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
     
export default class EmployeeService{

    static async getAll(options?:RequestGetALlEmployees): Promise<ResponseGetAllEmployees[]>{
        console.log("getAll", options);
        await delay(2000);
        const res: ResponseGetAllEmployees[] = [
            { id: "1asd",code:"NV001", name: "Nguyễn Văn A", phone: "0123456789", gender: "Nam", mail: "a@example.com" },
            { id: "aaa",code:"NV002",  name: "Trần Thị B", phone: "0987654321", gender: "Nữ", mail: "b@example.com" },
            { id: "ggsd",code:"NV003",  name: "Lê Văn C", phone: "0356789123", gender: "Nam", mail: "c@example.com" },
            { id: "hgf",code:"NV003",  name: "Lê Văn C", phone: "0356789123", gender: "Nam", mail: "c@example.com" },
          ];
          return res;
    }
    static async delete(id:string): Promise<void> {
        console.log("Delete : ", id);
        await delay(2000);
    }   
    static async create(model:EmployeeCreateSchema): Promise<void> {
        console.log("Create : ", model);
        await delay(2000);
    }
    
    static async update(model:EmployeeUpdateSchema): Promise<void> {
        console.log("Update : ", model);
        await delay(2000);
    }
}