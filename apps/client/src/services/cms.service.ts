import axios from "axios";

const CMS_URL =
  import.meta.env.VITE_STRAPI_URL;

const cmsApi = axios.create({
  baseURL: `${CMS_URL}/api`,
});

export const getHomepage = async () => {
  const response = await cmsApi.get(
    "/homepage?populate=*"
  );

  return response.data.data;
};