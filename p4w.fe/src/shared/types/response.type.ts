export interface IResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

export interface IMetaData {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

export interface IResponsePagination<T> {
  code: number;
  success: boolean;
  message: string;
  data: T[];
  metaData: IMetaData | null;
}

export interface ISingleFileRequest {
  contextType: string;
  contextId?: string;
  folderId?: string;
  file: string;
}