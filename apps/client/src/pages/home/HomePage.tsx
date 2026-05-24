import { motion } from "framer-motion";

import { useQuery } from "@tanstack/react-query";

import {
  getHomepage,
  getFaqs,
  getAnnouncements,
} from "@/services/cms.service";
import Navbar from "@/components/home/navbar";
import HeroSection from "@/components/home/hero-section";
import StatsSection from "@/components/home/stats-section";
import FeaturesSection from "@/components/home/features-section";
import ActivityPanel from "@/components/home/activity-panel";
import AnnouncementsSection from "@/components/home/announcements-section";
import FAQSection from "@/components/home/faq-section";
import Footer from "@/components/home/footer";
import LoadingScreen from "@/components/home/loading-screen";


const HomePage = () => {
  const {
    data: homepage,
    isLoading: homepageLoading,
  } = useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepage,
  });

  const {
    data: faqs,
    isLoading: faqsLoading,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: getFaqs,
  });

  const {
    data: announcements,
    isLoading: announcementsLoading,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: getAnnouncements,
  });

  const isLoading =
    homepageLoading ||
    faqsLoading ||
    announcementsLoading;

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#f7f7f8]"
    >
      <Navbar />

      <HeroSection homepage={homepage} />

      <StatsSection />

      <FeaturesSection />

      <ActivityPanel />

      <AnnouncementsSection
        announcements={announcements}
      />

      <FAQSection faqs={faqs} />

      <Footer />
    </motion.div>
  );
};

export default HomePage;