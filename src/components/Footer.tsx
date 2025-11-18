import { Linkedin, Twitter, Github, Mail, MapPin, Phone } from "lucide-react";
import logoSymbol from "@/assets/logo-symbol.png";
import logoWebgest from "@/assets/logo-webgest.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-b from-background via-background to-card border-t border-border/50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      <div className="container mx-auto px-6 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <img src={logoSymbol} alt="Loyaltify" className="h-8 mb-4" />
              <p className="text-sm text-muted-foreground font-pathway leading-relaxed">
                {t("footer.description")}
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-foreground mb-6 font-pathway text-lg">
              {t("footer.product")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/#features" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-pathway inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {t("footer.features")}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="/#solutions" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-pathway inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {t("footer.solutions")}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-foreground mb-6 font-pathway text-lg">
              {t("footer.company")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/#contact" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-pathway inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {t("footer.contact")}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-6 font-pathway text-lg">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground font-pathway">
                <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="mailto:info@loyaltify.com" className="hover:text-primary transition-colors">
                  info@loyaltify.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground font-pathway">
                <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground font-pathway">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-2 h-2 rounded-full bg-primary/50"></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground font-pathway">
            {t("footer.copyright")}
          </p>
          
          <div className="flex gap-8 text-sm">
            <a 
              href="/privacy-policy" 
              className="text-muted-foreground hover:text-primary transition-colors font-pathway relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              {t("footer.privacyPolicy")}
            </a>
            <a 
              href="/terms-of-service" 
              className="text-muted-foreground hover:text-primary transition-colors font-pathway relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              {t("footer.termsOfService")}
            </a>
            <a 
              href="/politica-cookies" 
              className="text-muted-foreground hover:text-primary transition-colors font-pathway relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              Política de Cookies
            </a>
          </div>
        </div>

        {/* Webgest Watermark */}
        <div className="mt-12 text-center">
          <a 
            href="https://webgestsolutions.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-card/80 to-card/50 border border-border/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 group"
          >
            <img 
              src={logoWebgest} 
              alt="Webgest Solutions" 
              className="h-8 opacity-60 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <span className="text-sm font-pathway text-muted-foreground group-hover:text-primary transition-colors">
              {t("footer.developed")} <span className="font-semibold">Webgest Solutions</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
