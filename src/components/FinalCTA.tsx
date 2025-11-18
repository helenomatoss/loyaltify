import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTA = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-24 relative overflow-hidden">{/* Added id="contact" for footer link */}
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, hsl(162 69% 51%) 0%, hsl(167 99% 20%) 100%)',
        }}
      />
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal animation="scale">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-pathway text-white">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-white/80 mb-10 font-pathway">
              {t("cta.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] text-lg h-14 px-10 font-semibold"
                asChild
              >
                <a href="/demo">
                  <Calendar className="w-5 h-5" />
                  {t("cta.bookDemo")}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>

            <p className="mt-6 text-white/60 text-sm font-pathway">
              {t("cta.sandboxInfo")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FinalCTA;
