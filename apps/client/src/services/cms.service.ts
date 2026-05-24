import axios from "axios";

const CMS_URL = "http://localhost:1337/api";

export const getHomepage = async () => {
  const res = await axios.get(
    `${CMS_URL}/homepage?populate=*`
  );

  return res.data;
};

export const getFaqs = async () => {
  const res = await axios.get(
    `${CMS_URL}/faqs`
  );

  return res.data;
};

export const getAnnouncements = async () => {
  const res = await axios.get(
    `${CMS_URL}/announcements`
  );

  return res.data;
};