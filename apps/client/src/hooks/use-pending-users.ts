import { useQuery } from "@tanstack/react-query";

import { getPendingUsers } from "@/services/admin.service";

interface Params {
  page: number;
}

export const usePendingUsers =
  ({ page }: Params) => {
    return useQuery({
      queryKey: [
        "pending-users",
        page,
      ],

      queryFn: () =>
        getPendingUsers({
          page,
          limit: 5,
        }),
    });
  };