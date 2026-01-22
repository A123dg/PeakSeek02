
export interface IOrganization {
  id: number;
  maToChuc: string;
  tenToChuc: string;
  maSoThue?: string;
  website?: string;
  soDienThoai?: string;
  email?: string;
  diaChi?: string;
  trangThai: boolean;
}

export interface IUser {
  nhanVienID: number;
  hoTen: string;
  maNhanVien: string;
  ngaySinh?: string;
  gioiTinh?: number;
  soDienThoai: string;
  caLamViecId?: number;
  soPhepConLai?: number;
  email: string;
  diaChi?: string;
  cccd: string;
  trinhDoHocVan?: string;
  phongBan?: string;
  chucVu?: string;
  nguoiQuanLy?: string;
  ngayBatDau?: string;
  maSoThue?: string;
  tknh?: string;
  tenNH?: string;
  quocTich?: string;
  danToc?: string;
  trangThai: number;
  tenDangNhap: string;
  matKhau: string;
  anhDaiDien?: string;
  ngayCap: string;
  noiCap: string;
  toChuc: string;
  donVi?: string;
  thuMuc: string;
  menuIds: number[];
}