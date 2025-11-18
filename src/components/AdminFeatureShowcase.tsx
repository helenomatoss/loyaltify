import { useState } from "react";
import { List, Bell, BarChart3, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import adminSegmentation from "@/assets/admin-segmentation.jpg";
import adminNotifications from "@/assets/admin-notifications.jpg";
import adminMetrics from "@/assets/admin-metrics.jpg";
import adminMultiunit from "@/assets/admin-multiunit.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const AdminFeatureShowcase = () => {
  const { t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: List,
      title: t("adminFeatures.segmentation.title"),
      description: t("adminFeatures.segmentation.description"),
      image: adminSegmentation,
    },
    {
      icon: Bell,
      title: t("adminFeatures.pushNotifications.title"),
      description: t("adminFeatures.pushNotifications.description"),
      image: adminNotifications,
    },
    {
      icon: BarChart3,
      title: t("adminFeatures.customMetrics.title"),
      description: t("adminFeatures.customMetrics.description"),
      image: adminMetrics,
    },
    {
      icon: Building2,
      title: t("adminFeatures.multiUnit.title"),
      description: t("adminFeatures.multiUnit.description"),
      image: adminMultiunit,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-pathway">
              {t("adminFeatures.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-pathway">
              {t("adminFeatures.subtitle")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section - Left Side */}
          <ScrollReveal>
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {features.map((feature, index) => (
                <img
                  key={index}
                  src={feature.image}
                  alt={feature.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    activeFeature === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </ScrollReveal>

          {/* Features Section - Right Side */}
          <ScrollReveal>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary mb-8 font-pathway">
                {t("adminFeatures.sectionTitle")}
              </h3>
              
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      activeFeature === index
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg transition-colors ${
                          activeFeature === index
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent text-accent-foreground"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 font-pathway">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground font-pathway">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AdminFeatureShowcase;
