import { useState } from "react";
import { Gift, Ticket, Trophy } from "lucide-react";
import featureCashback from "@/assets/feature-cashback.jpg";
import featurePromotions from "@/assets/feature-promotions.jpg";
import featureSubscription from "@/assets/feature-subscription.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const { t } = useLanguage();

  const features = [
    {
      icon: Gift,
      title: t("features.cashback.title"),
      description: t("features.cashback.description"),
      image: featureCashback,
    },
    {
      icon: Ticket,
      title: t("features.promotions.title"),
      description: t("features.promotions.description"),
      image: featurePromotions,
    },
    {
      icon: Trophy,
      title: t("features.subscription.title"),
      description: t("features.subscription.description"),
      image: featureSubscription,
    },
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-pathway">
              {t("features.title")} <span className="text-primary">{t("features.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-pathway">
              {t("features.subtitle")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-pathway text-foreground">
              {t("features.forYourCustomer")}
            </h3>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features Section - Left Side */}
          <ScrollReveal>
            <div className="space-y-6">
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

          {/* Image Section - Right Side */}
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
                  loading="lazy"
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
