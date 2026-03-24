import { useUserListQuery } from "../../services/query";

export const useUesrData = (filter: any) => {
  const { data: apiRes, isLoading } = useUserListQuery({
    params: filter ?? {},
    options: {
      select: (res) => res,
    }
  });
  const mapData = (data: any[]) =>
    data.map((item: any, index: number) => ({
      id: item.id,
      stt: index + 1,
      useName: item.userName,
      email: item.email,
      // tenTiengAnh: item.tenEN,
      status: item.statusName,
      role: item.roleName,
    })) ?? [];


  return {
    data: mapData(apiRes?.data ?? []),
    isLoading,
    pageIndex: apiRes?.metaData?.page ?? 1,
    pageSize: apiRes?.metaData?.pageSize ?? 10,
    total: apiRes?.metaData.total ?? 0,
  };
};





