import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-2xl">
          <div className="mb-8 relative">
            <h1 className="text-9xl font-bold font-pathway bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-br from-primary to-secondary -z-10"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-pathway">
            Página não encontrada
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 font-pathway">
            A página que você está procurando não existe ou foi movida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="font-pathway">
                <Home className="w-4 h-4 mr-2" />
                Voltar para Home
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => window.history.back()}
              className="font-pathway"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Página Anterior
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
