import { useQuery } from "@tanstack/react-query";

import { getHomepage } from "@/services/cms.service";

export const useHomepage = () => {
  return useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepage,
  });
};