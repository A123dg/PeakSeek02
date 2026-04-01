import { useLocationListQuery } from "../../services/query";

export type LocationStatus = "pending" | "approved" | "rejected" | "active" | "inactive";

export interface LocationRow {
  id: string;
  name: string;
  type: string;
  typeCode: number;
  address: string;
  openingHours: string;
  closingHours?: string;
  description?: string;
  status: LocationStatus;
  statusCode: number;
  ownerId?: string | null;
  ownerName?: string | null;
  addressLink?: string;
  mediaLinkUrls?: string[];
  pendingMediaLinkUrls?: string[];
}

const locationTypeMap: Record<number, string> = {
  1: "Thu vien",
  2: "Quan ca phe",
  3: "Nha sach",
  4: "Coworking",
  5: "Study cafe",
  6: "Van phong",
};

export const useLocationData = (filter?: { page?: number; pageSize?: number }) => {
  const { data: apiRes, isLoading } = useLocationListQuery({
    params: filter ?? {},
    options: {
      select: (res) => res,
    },
  });

  const mappedData: LocationRow[] =
    apiRes?.data?.map((item: any) => ({
      id: item.id,
      name: item.locationName,
      type: locationTypeMap[item.type] ?? `Loai ${item.type}`,
      typeCode: item.type,
      address: item.address,
      openingHours: item.openingHours ?? "",
      closingHours: item.closingHours ?? undefined,
      description: item.description ?? undefined,
      status: item.statusName,
      statusCode: item.status,
      ownerId: item.ownerId,
      ownerName: item.ownerName,
      addressLink: item.addressLink ?? undefined,
      mediaLinkUrls: item.mediaLinkUrls ?? [],
      pendingMediaLinkUrls: item.pendingMediaLinkUrls ?? [],
    })) ?? [];

  return {
    data: mappedData,
    isLoading,
    total: apiRes?.metaData?.total ?? 0,
    pageIndex: apiRes?.metaData?.page ?? filter?.page ?? 1,
    pageSize: apiRes?.metaData?.pageSize ?? filter?.pageSize ?? 10,
  };
};
