import { useQuery } from "@tanstack/react-query";

import { getAdminUsers } from "@/services/admin.service";

interface Params {
  page: number;

  search: string;

  status: string;

  sort: string;
}

export const useAdminUsers = ({ page, search, status, sort }: Params) => {
  return useQuery({
    queryKey: ["admin-users", page, search, status, sort],

    queryFn: () =>
      getAdminUsers({
        page,
        limit: 8,
        search,
        status,
        sort,
      }),
  });
};
