import DemoHeader from "@/components/DemoHeader";
import DemoFooter from "@/components/DemoFooter";
import DemoForm from "@/components/DemoForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import clientPrince from "@/assets/client-prince.png";
import clientSpoonFork from "@/assets/client-spoonandfork.png";
import clientMihito from "@/assets/client-mihito.png";

const Demo = () => {
  const { t } = useLanguage();
  useGoogleAnalytics(); // Track page view

  const benefits = [
    { key: "efficient", icon: Check },
    { key: "datadriven", icon: Check },
    { key: "reliable", icon: Check },
  ];

  return (
    <div className="min-h-screen bg-background font-pathway flex flex-col">
      <DemoHeader />
      <Breadcrumbs />
      
      {/* Background animated pattern */}
      <div 
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(38, 220, 143, 0.03) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(38, 220, 143, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Animated glow effect */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] animate-glow-pulse" 
           style={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }} />

      <main className="flex-1 flex items-center justify-center py-16 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Value Proposition */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold font-pathway">
                  {t("demo.title")}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {t("demo.subtitle")}
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.key} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <benefit.icon className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {t(`demo.benefits.${benefit.key}.title`)}
                      </h3>
                      <p className="text-muted-foreground">
                        {t(`demo.benefits.${benefit.key}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Signals */}
              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  {t("demo.trustedBy")}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <a 
                    href="https://www.princesteakhouse.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img 
                      src={clientPrince} 
                      alt="Prince Japanese Steakhouse" 
                      className="h-10 md:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
                      loading="lazy"
                    />
                  </a>
                  <a 
                    href="https://www.spoonandfork.ca/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img 
                      src={clientSpoonFork} 
                      alt="Spoon & Fork Restaurant" 
                      className="h-10 md:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
                      loading="lazy"
                    />
                  </a>
                  <a 
                    href="https://www.mihito.ca/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img 
                      src={clientMihito} 
                      alt="Mi'Hito Sushi Laboratory" 
                      className="h-10 md:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <DemoForm />
            </div>
          </div>
        </div>
      </main>

      <DemoFooter />
    </div>
  );
};

export default Demo;
