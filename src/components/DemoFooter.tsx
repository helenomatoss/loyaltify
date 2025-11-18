import { useLanguage } from "@/contexts/LanguageContext";
import logoWebgest from "@/assets/logo-webgest.png";

const DemoFooter = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t border-border py-8 bg-card/30 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-pathway">
            {t("footer.copyright")}
          </p>
          
          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a 
              href="/privacy-policy" 
              className="text-muted-foreground hover:text-primary transition-colors font-pathway"
            >
              {t("footer.privacyPolicy")}
            </a>
            <a 
              href="/terms-of-service" 
              className="text-muted-foreground hover:text-primary transition-colors font-pathway"
            >
              {t("footer.termsOfService")}
            </a>
            <a 
              href="/politica-cookies" 
              className="text-muted-foreground hover:text-primary transition-colors font-pathway"
            >
              Política de Cookies
            </a>
          </div>
          
          {/* Webgest Watermark */}
          <a 
            href="https://webgestsolutions.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card/50 rounded-lg border border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md group"
          >
            <img 
              src={logoWebgest} 
              alt="Webgest Solutions" 
              className="h-10 opacity-70 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <span className="text-sm font-pathway text-foreground/70 group-hover:text-primary transition-colors">
              {t("footer.developed")} <span className="font-semibold">Webgest Solutions</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default DemoFooter;
