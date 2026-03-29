import { useUserListQuery } from "../../services/query";

export const useUesrData = (filter?: any) => {
  const { data: apiRes, isLoading } = useUserListQuery({
    params: filter ?? {},
    options: {
      select: (res) => res,
    },
  });

  const mapData = (data: any[]) =>
    data.map((item: any, index: number) => ({
      id: item.id,
      stt: index + 1,
      userName: item.userName,
      email: item.email,
      roleId: item.roleId,
      roleName: item.roleName,
      status: item.status,
      statusName: item.statusName,
      dateOfBirth: item.dateOfBirth,
      mediaLinkUrl: item.mediaLinkUrl,
      createdAt: item.createdAt,
      ownedLocations: item.ownedLocations ?? [],
    })) ?? [];

  return {
    data: mapData(apiRes?.data ?? []),
    isLoading,
    pageIndex: apiRes?.metaData?.page ?? 1,
    pageSize: apiRes?.metaData?.pageSize ?? 10,
    total: apiRes?.metaData?.total ?? 0,
  };
};
