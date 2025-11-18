import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FeatureShowcase from "@/components/FeatureShowcase";
import AdminFeatureShowcase from "@/components/AdminFeatureShowcase";
import Solutions from "@/components/Solutions";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-pathway">
      <Header />
      <Breadcrumbs />
      <Hero />
      <TrustBar />
      <FeatureShowcase />
      <AdminFeatureShowcase />
      <Solutions />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
