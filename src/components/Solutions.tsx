import { UtensilsCrossed, ShoppingBag, Scissors } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const Solutions = () => {
  const { t } = useLanguage();
  
  const solutions = [
    {
      icon: UtensilsCrossed,
      title: t("solutions.restaurants.title"),
      description: t("solutions.restaurants.description"),
      features: [
        t("solutions.restaurants.feature1"),
        t("solutions.restaurants.feature2"),
        t("solutions.restaurants.feature3"),
        t("solutions.restaurants.feature4"),
      ],
    },
    {
      icon: ShoppingBag,
      title: t("solutions.retail.title"),
      description: t("solutions.retail.description"),
      features: [
        t("solutions.retail.feature1"),
        t("solutions.retail.feature2"),
        t("solutions.retail.feature3"),
      ],
    },
    {
      icon: Scissors,
      title: t("solutions.services.title"),
      description: t("solutions.services.description"),
      features: [
        t("solutions.services.feature1"),
        t("solutions.services.feature2"),
        t("solutions.services.feature3"),
      ],
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-pathway">
              {t("solutions.title")} <span className="text-primary">{t("solutions.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-pathway">
              {t("solutions.subtitle")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 150}>
              <div
                className="group bg-card border border-border rounded-lg p-8 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(162_69%_51%/0.1)] transition-all duration-300"
              >
                <div className="mb-6 p-4 bg-primary/10 rounded-lg inline-block group-hover:bg-primary/20 transition-colors">
                  <solution.icon className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 font-pathway">{solution.title}</h3>
                <p className="text-muted-foreground mb-6 font-pathway">{solution.description}</p>
                
                <ul className="space-y-2">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-pathway">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
