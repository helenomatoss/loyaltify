import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import logoFull from "@/assets/logo-full.png";
import flagBrazil from "@/assets/flag-brazil.png";
import flagUSA from "@/assets/flag-usa.png";

const DemoHeader = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-block">
            <img 
              src={logoFull} 
              alt="Loyaltify" 
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-muted rounded-full p-1">
              <button
                onClick={() => setLanguage("pt")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 ease-in-out ${
                  language === "pt" ? "bg-primary text-primary-foreground shadow-md scale-105" : "hover:bg-background/50"
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;
