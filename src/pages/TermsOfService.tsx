import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, ShieldCheck, UserCheck, Database, DollarSign, XCircle, AlertTriangle, Mail, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const { t } = useLanguage();

  const sections = [
    {
      icon: FileText,
      title: t("legal.terms.acceptance.title"),
      content: t("legal.terms.acceptance.content"),
    },
    {
      icon: ShieldCheck,
      title: t("legal.terms.services.title"),
      content: t("legal.terms.services.content"),
      items: [
        t("legal.terms.services.item1"),
        t("legal.terms.services.item2"),
        t("legal.terms.services.item3"),
        t("legal.terms.services.item4"),
      ],
    },
    {
      icon: UserCheck,
      title: t("legal.terms.account.title"),
      content: t("legal.terms.account.content"),
    },
    {
      icon: Database,
      title: t("legal.terms.data.title"),
      content: t("legal.terms.data.content"),
    },
    {
      icon: DollarSign,
      title: t("legal.terms.fees.title"),
      content: t("legal.terms.fees.content"),
    },
    {
      icon: XCircle,
      title: t("legal.terms.termination.title"),
      content: t("legal.terms.termination.content"),
    },
    {
      icon: AlertTriangle,
      title: t("legal.terms.limitation.title"),
      content: t("legal.terms.limitation.content"),
    },
    {
      icon: Mail,
      title: t("legal.terms.contact.title"),
      content: t("legal.terms.contact.content"),
      email: "legal@loyaltify.com",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/5 via-background to-primary/5 pt-32 pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6 animate-fade-in">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-pathway font-semibold">{t("legal.terms.title")}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-pathway animate-fade-in">
              {t("legal.terms.title")}
            </h1>
            
            <div className="flex items-center justify-center gap-2 text-muted-foreground animate-fade-in">
              <Clock className="w-4 h-4" />
              <p className="text-sm font-pathway">
                {t("legal.lastUpdated")}: January 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card 
                  key={index}
                  className="p-8 hover:shadow-xl transition-all duration-300 border-primary/20 group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 group-hover:from-secondary/30 group-hover:to-primary/30 transition-colors">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <h2 className="text-2xl font-bold font-pathway group-hover:text-primary transition-colors">
                        {section.title}
                      </h2>
                      
                      <p className="text-muted-foreground font-pathway leading-relaxed">
                        {section.content}
                        {section.email && (
                          <a 
                            href={`mailto:${section.email}`} 
                            className="text-primary hover:underline ml-1"
                          >
                            {section.email}
                          </a>
                        )}
                      </p>
                      
                      {section.items && (
                        <ul className="space-y-3 mt-4">
                          {section.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground font-pathway">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Additional Information */}
          <Card className="mt-16 p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold font-pathway">
                {t("legal.terms.acceptance.title").replace("1. ", "")}
              </h3>
              <p className="text-muted-foreground font-pathway max-w-2xl mx-auto">
                By using Loyaltify's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you have any questions, please contact our legal team.
              </p>
            </div>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
