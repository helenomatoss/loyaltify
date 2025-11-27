import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroWaves from "@/assets/hero-waves.jpg";
import Logo3DCanvas from "@/components/Logo3DCanvas";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const Hero = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isLightMode = theme === "light";
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with theme-aware opacity and parallax effect */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${heroWaves})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isLightMode ? 0.85 : 0.5,
          filter: isLightMode ? 'brightness(1.05) contrast(1.15) saturate(1.3)' : 'brightness(1) saturate(1.2)',
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />
      
      {/* Tech grid overlay for modern feel */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(${isLightMode ? 'rgba(1, 102, 82, 0.01)' : 'rgba(38, 220, 143, 0.01)'} 1px, transparent 1px), 
                           linear-gradient(90deg, ${isLightMode ? 'rgba(1, 102, 82, 0.01)' : 'rgba(38, 220, 143, 0.01)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Animated glow effect - changes color based on theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] animate-glow-pulse" 
           style={{ backgroundColor: 'hsl(var(--hero-animation) / 0.15)' }} />

      {/* Content */}
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* 3D Logo */}
          <div className="flex justify-center mb-8 animate-float">
            <Logo3DCanvas />
          </div>

          {/* Text Content */}
          <div className="relative">
            {/* Main Headline */}
            <h1
            className="text-5xl md:text-7xl font-bold leading-snug md:leading-[1.15] mb-6 font-pathway animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #00DF88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))'
            }}
          >
            {t("hero.title")}{" "}
            {t("hero.titleHighlight")}
            <br />
            {t("hero.titleEnd")}
          </h1>

          {/* Sub-headline */}
          <p 
            className="text-lg md:text-xl font-semibold mb-12 max-w-3xl mx-auto font-pathway animate-fade-in"
            style={{
              color: '#FFFFFF',
              textShadow: isLightMode
                ? '2px 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)'
                : '2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7)'
            }}
          >
            {t("hero.subtitle")}
          </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Button
                variant="hero"
                size="lg"
                className="group xl:h-11 xl:px-6 2xl:h-12 2xl:px-8"
                asChild
              >
                <a href="/demo">
                  {t("hero.bookDemo")}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
