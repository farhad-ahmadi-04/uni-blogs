import { ApiResponse } from '@/types/types';

const getData = async (api: string): Promise<ApiResponse> => {
  const res = await fetch(api);
  const data: ApiResponse = await res.json();
  return data;
};

export default getData;
