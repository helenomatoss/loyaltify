import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface CookiePreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CookiePreferencesModal = ({ open, onOpenChange }: CookiePreferencesModalProps) => {
  const { preferences, savePreferences, acceptAll, updatePreferences } = useCookieConsent();
  const [localPreferences, setLocalPreferences] = useState(preferences);

  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  const handleSave = () => {
    savePreferences(localPreferences);
    onOpenChange(false);
  };

  const handleAcceptAll = () => {
    acceptAll();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-pathway text-foreground">
            Gerenciar Preferências de Cookies
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-pathway">
            Você pode alterar suas escolhas a qualquer momento. Suas preferências serão aplicadas a todo o site.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Cookies Essenciais */}
          <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="necessary" className="text-base font-semibold font-pathway text-foreground">
                  Cookies Essenciais (Necessários)
                </Label>
                <p className="text-sm text-muted-foreground mt-1 font-pathway">
                  Esses cookies são fundamentais para o funcionamento do site e não podem ser desativados. 
                  Eles incluem funcionalidades como manter você logado.
                </p>
              </div>
              <Switch
                id="necessary"
                checked={true}
                disabled={true}
                className="ml-4"
              />
            </div>
          </div>

          {/* Cookies de Análise */}
          <div className="space-y-3 p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="analytics" className="text-base font-semibold font-pathway text-foreground">
                  Cookies de Análise e Performance
                </Label>
                <p className="text-sm text-muted-foreground mt-1 font-pathway">
                  Nos ajudam a entender como os visitantes interagem com o site, coletando informações anonimamente. 
                  Isso nos permite melhorar sua experiência.
                </p>
              </div>
              <Switch
                id="analytics"
                checked={localPreferences.analytics}
                onCheckedChange={(checked) =>
                  setLocalPreferences({ ...localPreferences, analytics: checked })
                }
                className="ml-4"
              />
            </div>
          </div>

          {/* Cookies de Marketing */}
          <div className="space-y-3 p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="marketing" className="text-base font-semibold font-pathway text-foreground">
                  Cookies de Marketing e Publicidade
                </Label>
                <p className="text-sm text-muted-foreground mt-1 font-pathway">
                  Usados para rastrear a sua navegação e exibir anúncios relevantes em outros sites, 
                  baseados nos seus interesses.
                </p>
              </div>
              <Switch
                id="marketing"
                checked={localPreferences.marketing}
                onCheckedChange={(checked) =>
                  setLocalPreferences({ ...localPreferences, marketing: checked })
                }
                className="ml-4"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleAcceptAll}
            className="w-full sm:w-auto"
          >
            Permitir Todos
          </Button>
          <Button
            onClick={handleSave}
            className="w-full sm:flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Salvar Minhas Preferências
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookiePreferencesModal;
