export interface ResponseGetAllEmployees{
    id: string;
    code: string;
    name: string;
    phone: string;
    mail: string;
    gender: "Nam" | "Nữ" | "Khác";
}