import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoFull from "@/assets/logo-full.png";
import flagBrazil from "@/assets/flag-brazil.png";
import flagUSA from "@/assets/flag-usa.png";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoFull} alt="Loyaltify" className="h-8" />
          </Link>
          
          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <a href="/#features" className="text-foreground hover:text-primary transition-colors font-pathway">
              {t("header.features")}
            </a>
            <a href="/#solutions" className="text-foreground hover:text-primary transition-colors font-pathway">
              {t("header.solutions")}
            </a>
            <a href="/#contact" className="text-foreground hover:text-primary transition-colors font-pathway">
              {t("header.contact")}
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-muted rounded-full p-1">
              <button
                onClick={() => setLanguage("pt-BR")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 ease-in-out ${
                  language === "pt-BR" ? "bg-primary text-primary-foreground shadow-md scale-105" : "hover:bg-background/50"
                }`}
                title="Português (Brasil)"
              >
                <img src={flagBrazil} alt="Brasil" className="w-6 h-4 object-cover rounded-sm" />
                <span className="text-sm font-medium">PT</span>
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 ease-in-out ${
                  language === "en" ? "bg-primary text-primary-foreground shadow-md scale-105" : "hover:bg-background/50"
                }`}
                title="English (United States)"
              >
                <img src={flagUSA} alt="USA" className="w-6 h-4 object-cover rounded-sm" />
                <span className="text-sm font-medium">EN</span>
              </button>
            </div>
            
            <Button variant="hero" size="lg" asChild>
              <a href="/demo">{t("header.bookDemo")}</a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-full p-0.5">
              <button
                onClick={() => setLanguage("pt-BR")}
                className={`p-1.5 rounded-full transition-all duration-300 ease-in-out ${
                  language === "pt-BR" ? "bg-primary shadow-md scale-110" : ""
                }`}
              >
                <img src={flagBrazil} alt="PT" className="w-5 h-3.5 object-cover rounded-sm" />
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`p-1.5 rounded-full transition-all duration-300 ease-in-out ${
                  language === "en" ? "bg-primary shadow-md scale-110" : ""
                }`}
              >
                <img src={flagUSA} alt="EN" className="w-5 h-3.5 object-cover rounded-sm" />
              </button>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-8">
                  <a 
                    href="/#features" 
                    className="text-lg font-pathway text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("header.features")}
                  </a>
                  <a 
                    href="/#solutions" 
                    className="text-lg font-pathway text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("header.solutions")}
                  </a>
                  <a 
                    href="/#contact" 
                    className="text-lg font-pathway text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("header.contact")}
                  </a>
                  
                  <div className="pt-6 border-t border-border">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                      asChild
                    >
                      <a href="/demo">{t("header.bookDemo")}</a>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
