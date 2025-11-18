import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import CookiePreferencesModal from "./CookiePreferencesModal";

const CookieConsent = () => {
  const { showBanner, acceptAll, rejectAll, setShowBanner } = useCookieConsent();
  const [showModal, setShowModal] = useState(false);

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-card border border-border rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-bold font-pathway text-foreground">
                  Nós valorizamos a sua privacidade
                </h3>
                <p className="text-sm text-muted-foreground font-pathway">
                  Este site utiliza cookies para otimizar sua experiência de navegação e analisar o uso do site. 
                  Você pode aceitar todos os cookies ou personalizar suas preferências.{" "}
                  <a 
                    href="/politica-cookies" 
                    className="text-primary hover:underline font-medium"
                  >
                    Leia nossa Política de Cookies e Privacidade.
                  </a>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={rejectAll}
                  className="w-full sm:w-auto"
                >
                  Rejeitar Todos
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowModal(true)}
                  className="w-full sm:w-auto"
                >
                  Personalizar Preferências
                </Button>
                <Button
                  onClick={acceptAll}
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Aceitar Todos
                </Button>
              </div>
            </div>

            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fechar banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <CookiePreferencesModal 
        open={showModal} 
        onOpenChange={setShowModal} 
      />
    </>
  );
};

export default CookieConsent;
