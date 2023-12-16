// create-sinhvien.dto.ts
export class CreateSinhvienDto {
    masv: string;
    tensv: string;
    ngaysinh: Date;
    gioitinh: number;
    sdt?: string;
    email?: string;
    gpa?: number;
    lop: number; // Assuming maLop is the ID of the class (Lop)
}
