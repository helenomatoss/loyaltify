import { Shield, Award, Lock, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import clientPrince from "@/assets/client-prince.png";
import clientSpoonFork from "@/assets/client-spoonandfork.png";
import clientMihito from "@/assets/client-mihito.png";

const TrustBar = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 border-y border-border bg-card/30">
      <div className="container mx-auto px-6">
        {/* Trusted by section */}
        <ScrollReveal animation="fade-up">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4 font-pathway">{t("trustBar.trusted")}</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <img 
                src={clientPrince} 
                alt="Prince Japanese Steakhouse" 
                className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
                loading="lazy"
              />
              <img 
                src={clientSpoonFork} 
                alt="Spoon & Fork Restaurant" 
                className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
                loading="lazy"
              />
              <img 
                src={clientMihito} 
                alt="Mi'Hito Sushi Laboratory" 
                className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustBar;
