import { motion } from "framer-motion";

import { useQuery } from "@tanstack/react-query";

import { getHomepage } from "@/services/cms.service";

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
    isLoading,
    error,
  } = useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepage,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !homepage) {
    return (
      <div className="flex h-screen items-center justify-center">
        Failed to load homepage
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#f7f7f8]"
    >
      <Navbar />

      <HeroSection
        hero={homepage.hero}
      />

      <StatsSection
        stats={homepage.stats}
      />

      <FeaturesSection
        features={homepage.features}
      />

      <ActivityPanel />

      <AnnouncementsSection
        announcements={
          homepage.announcements
        }
      />

      <FAQSection
        faq={homepage.FAQ}
      />

      <Footer />
    </motion.div>
  );
};

export default HomePage;