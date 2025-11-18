import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Lock, Eye, Database, FileText, Users, Mail, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  const sections = [
    {
      icon: FileText,
      title: t("legal.privacy.intro.title"),
      content: t("legal.privacy.intro.content"),
    },
    {
      icon: Database,
      title: t("legal.privacy.collection.title"),
      content: t("legal.privacy.collection.content"),
      items: [
        t("legal.privacy.collection.item1"),
        t("legal.privacy.collection.item2"),
        t("legal.privacy.collection.item3"),
        t("legal.privacy.collection.item4"),
      ],
    },
    {
      icon: Eye,
      title: t("legal.privacy.usage.title"),
      content: t("legal.privacy.usage.content"),
      items: [
        t("legal.privacy.usage.item1"),
        t("legal.privacy.usage.item2"),
        t("legal.privacy.usage.item3"),
        t("legal.privacy.usage.item4"),
      ],
    },
    {
      icon: Users,
      title: t("legal.privacy.sharing.title"),
      content: t("legal.privacy.sharing.content"),
    },
    {
      icon: Shield,
      title: t("legal.privacy.security.title"),
      content: t("legal.privacy.security.content"),
    },
    {
      icon: Lock,
      title: t("legal.privacy.rights.title"),
      content: t("legal.privacy.rights.content"),
      items: [
        t("legal.privacy.rights.item1"),
        t("legal.privacy.rights.item2"),
        t("legal.privacy.rights.item3"),
        t("legal.privacy.rights.item4"),
      ],
    },
    {
      icon: FileText,
      title: t("legal.privacy.cookies.title"),
      content: t("legal.privacy.cookies.content"),
    },
    {
      icon: Mail,
      title: t("legal.privacy.contact.title"),
      content: t("legal.privacy.contact.content"),
      email: "privacy@loyaltify.com",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-32 pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-pathway font-semibold">{t("legal.privacy.title")}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-pathway animate-fade-in">
              {t("legal.privacy.title")}
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
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
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
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
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

          {/* Trust Badges */}
          <div className="mt-16 pt-16 border-t border-border">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center border-primary/20">
                <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold font-pathway mb-2">SOC 2 Type II</h3>
                <p className="text-sm text-muted-foreground font-pathway">
                  Industry-leading security standards
                </p>
              </Card>
              
              <Card className="p-6 text-center border-primary/20">
                <Lock className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold font-pathway mb-2">GDPR & CCPA</h3>
                <p className="text-sm text-muted-foreground font-pathway">
                  Full compliance with data regulations
                </p>
              </Card>
              
              <Card className="p-6 text-center border-primary/20">
                <Database className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold font-pathway mb-2">Data Encryption</h3>
                <p className="text-sm text-muted-foreground font-pathway">
                  End-to-end encryption for all data
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
