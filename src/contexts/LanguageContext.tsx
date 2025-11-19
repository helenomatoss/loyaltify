import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Language = "en" | "pt-BR";
type TranslationNode = Record<string, unknown>;

const isTranslationNode = (value: unknown): value is TranslationNode =>
  typeof value === "object" && value !== null && !Array.isArray(value);

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

type LocationLike = Pick<Location, "pathname" | "search">;

const STORAGE_KEY = "loyaltify_lang";
const LEGACY_STORAGE_KEY = "loyaltify-language";

const normalizeLanguage = (value: string | null): Language | null => {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase();
  if (normalized === "en") {
    return "en";
  }
  if (normalized === "pt" || normalized === "pt-br") {
    return "pt-BR";
  }
  return null;
};

const getStoredLanguage = (): Language | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
  if (stored) {
    return stored;
  }

  const legacy = normalizeLanguage(window.localStorage.getItem(LEGACY_STORAGE_KEY));
  if (legacy) {
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    window.localStorage.setItem(STORAGE_KEY, legacy);
    return legacy;
  }

  return null;
};

const getLanguageFromUrl = (location?: LocationLike): Language | null => {
  if (typeof window === "undefined" && !location) {
    return null;
  }

  const target = location ?? window.location;
  const path = target.pathname.toLowerCase();

  if (path === "/en" || path.startsWith("/en/")) {
    return "en";
  }

  if (path === "/pt" || path.startsWith("/pt/")) {
    return "pt-BR";
  }

  const params = new URLSearchParams(target.search);
  const urlLang = normalizeLanguage(params.get("lang"));
  return urlLang;
};

const getBrowserLanguage = (): Language | null => {
  if (typeof navigator === "undefined") {
    return null;
  }

  const locales = navigator.languages?.length ? navigator.languages : navigator.language ? [navigator.language] : [];
  if (!locales.length) {
    return null;
  }

  return locales.some((locale) => locale?.toLowerCase().startsWith("pt")) ? "pt-BR" : "en";
};

const cleanLangSearch = (search: string) => {
  if (!search) {
    return "";
  }

  const params = new URLSearchParams(search);
  if (!params.has("lang")) {
    return search;
  }

  params.delete("lang");
  const next = params.toString();
  return next ? `?${next}` : "";
};

const detectInitialLanguage = (): Language => {
  const stored = getStoredLanguage();
  if (stored) {
    return stored;
  }

  const urlLang = getLanguageFromUrl();
  if (urlLang) {
    return urlLang;
  }

  return getBrowserLanguage() ?? "en";
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguageState] = useState<Language>(() => (typeof window === "undefined" ? "en" : detectInitialLanguage()));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSetLanguage = (lang: Language) => {
    if (lang === language) {
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setLanguageState(lang);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let value: unknown = translations[language];

    for (const k of keys) {
      if (isTranslationNode(value)) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    return typeof value === "string" ? value : key;
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, language);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  }, [language]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const isLocalizedHome = path === "/" || path === "/en" || path === "/pt";
    if (!isLocalizedHome) {
      return;
    }

    const targetPath = language === "en" ? "/en" : "/";
    const sanitizedSearch = cleanLangSearch(location.search);

    if (path !== targetPath || sanitizedSearch !== location.search) {
      navigate(`${targetPath}${sanitizedSearch}`, { replace: true });
    }
  }, [language, location.pathname, location.search, navigate]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isTransitioning }}>
      <div className={`transition-opacity duration-150 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    header: {
      features: "Features",
      solutions: "Solutions",
      about: "About Us",
      contact: "Contact",
      bookDemo: "Book a Demo",
    },
    hero: {
      title: "The Data-Driven",
      titleHighlight: "Loyalty Platform",
      titleEnd: "That Will Drive Your Business.",
      subtitle: "Efficient, reliable, and data-driven solutions to increase customer retention and maximize lifetime value.",
      bookDemo: "Book a Demo",
      viewDocs: "View Documentation",
    },
    trustBar: {
      soc2: "SOC 2 Type II Compliant",
      gdpr: "GDPR & CCPA Ready",
      g2: "G2 Leader 2024",
      uptime: "99.9% Uptime SLA",
      trusted: "Trusted by leading brands across Canada",
      client: "Client",
    },
    features: {
      title: "Build Your Business Loyalty Program.",
      titleHighlight: "100% Customizable.",
      subtitle: "Retain customers your way, creating your own loyalty program that adapts to your business and converts visits into loyal customers.",
      forYourCustomer: "For your customer:",
      cashback: {
        title: "Cashback",
        description: "Create and Manage your own cashback program",
      },
      promotions: {
        title: "Customizable Promotions",
        description: "Create custom promotions for items or product/service combos and target specific customer segments",
      },
      subscription: {
        title: "Create Subscription Plans",
        description: "Retain your customers through personalized plans with monthly/quarterly/annual recurrence",
      },
      gamification: {
        title: "Gamification",
        description: "Engage customers with points, badges, and challenges",
      },
      coupons: {
        title: "Coupons & Vouchers",
        description: "Create dynamic discount codes and promotional campaigns",
      },
      tiered: {
        title: "Tiered Levels",
        description: "Build sophisticated tier-based reward programs",
      },
      referral: {
        title: "Referral Programs",
        description: "Turn customers into brand advocates",
      },
    },
    solutions: {
      title: "Flexible Solutions for",
      titleHighlight: "Any Industry",
      subtitle: "Custom-built features for your business. Deploy in days, not months.",
      restaurants: {
        title: "Restaurants",
        description: "Increase repeat visits with points-based rewards, birthday offers, and exclusive member benefits.",
        feature1: "POS Integration",
        feature2: "Integrate with your reservation system",
        feature3: "Multi-location support",
        feature4: "Customizable menu per location",
      },
      retail: {
        title: "Retail",
        description: "Increase basket size with tiered memberships, seasonal campaigns, and personalized offers.",
        feature1: "POS Integration",
        feature2: "Customizable Giftcards",
        feature3: "Inventory-based promotions to optimize sales",
      },
      services: {
        title: "Services",
        description: "Build lasting relationships and increase customer recurrence.",
        feature1: "Reward booking system",
        feature2: "Frequency tracking",
        feature3: "Referral programs",
      },
      learnMore: "Learn More",
    },
    adminFeatures: {
      title: "Complete Administrative Control",
      subtitle: "Powerful management tools to optimize your loyalty program",
      sectionTitle: "For your management:",
      segmentation: {
        title: "Segmentation Lists",
        description: "Create segmented lists for email and SMS campaigns",
      },
      pushNotifications: {
        title: "Push Notifications",
        description: "Connect directly with your customers",
      },
      customMetrics: {
        title: "Custom Metrics",
        description: "Monitor important metrics in real time",
      },
      multiUnit: {
        title: "Multi-Unit Management",
        description: "Manage multiple locations with unique catalogs and promotions, all on one platform",
      },
    },
    cta: {
      title: "Start Increasing Your Retention Today",
      subtitle: "Start growing your business with a data-driven loyalty program. #Data is the New Oil",
      bookDemo: "Book a Demo",
      talkToSales: "Talk to Sales",
      noCredit: "No credit card required",
      freeTrial: "14-day free trial",
      cancelAnytime: "Cancel anytime",
      sandboxInfo: "Test all features for free for 14 days through a dedicated sandbox environment.",
    },
    demo: {
      title: "Schedule Your Demo",
      subtitle: "Discover how Loyaltify's data-driven loyalty platform can boost your revenue.",
      trustedBy: "Trusted by leading Canadian businesses:",
      benefits: {
        efficient: {
          title: "Efficient",
          description: "Optimize your loyalty program with powerful tools.",
        },
        datadriven: {
          title: "Data-Driven",
          description: "Make decisions based on real customer insights.",
        },
        reliable: {
          title: "Reliable",
          description: "A robust platform designed to scale with your business.",
        },
      },
      form: {
        title: "Get Started Today",
        subtitle: "Fill out the form and our team will contact you shortly.",
        firstName: "First Name",
        firstNamePlaceholder: "John",
        lastName: "Last Name",
        lastNamePlaceholder: "Doe",
        workEmail: "Work Email",
        workEmailPlaceholder: "john@company.com",
        company: "Company Name",
        companyPlaceholder: "Your Company",
        locations: "Number of Locations",
        locationsPlaceholder: "Select number of locations",
        submit: "Request Demo",
        submitting: "Sending...",
        compliance: "By submitting this form, you agree to receive communications from Loyaltify. We respect your privacy and will never share your information.",
        success: {
          title: "Demo Requested Successfully!",
          description: "Our team will contact you within 24 hours.",
        },
        errors: {
          firstNameRequired: "First name is required",
          firstNameMax: "First name must be less than 50 characters",
          lastNameRequired: "Last name is required",
          lastNameMax: "Last name must be less than 50 characters",
          emailRequired: "Work email is required",
          emailInvalid: "Please enter a valid email address",
          emailMax: "Email must be less than 100 characters",
          companyRequired: "Company name is required",
          companyMax: "Company name must be less than 100 characters",
          locationsRequired: "Please select number of locations",
        },
      },
    },
    footer: {
      description: "The data-driven loyalty platform for modern businesses.",
      product: "Product",
      features: "Features",
      solutions: "Solutions",
      pricing: "Pricing",
      integrations: "Integrations",
      documentation: "Documentation",
      company: "Company",
      about: "About Us",
      careers: "Careers",
      contact: "Contact",
      blog: "Blog",
      rights: "All rights reserved.",
      copyright: "© 2025 Loyaltify. All rights reserved.",
      developed: "Developed with",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
    },
    about: {
      badge: "About Loyaltify",
      hero: {
        title: "Revolutionizing Customer Loyalty with",
        titleHighlight: "Data & Technology",
        subtitle: "We are a team of innovators, developers, and loyalty experts dedicated to helping businesses build stronger relationships with their customers through cutting-edge technology.",
      },
      stats: {
        clients: "Active Clients",
        uptime: "Platform Uptime",
        transactions: "Loyalty Transactions",
        support: "Customer Support",
      },
      mission: {
        badge: "Our Mission",
        title: "Empowering Businesses Through Smart Loyalty",
        description: "At Loyaltify, we believe that customer loyalty is the cornerstone of sustainable business growth. Our mission is to provide businesses with the most advanced, data-driven loyalty platform that turns one-time customers into lifelong advocates.",
        description2: "We combine powerful technology with deep industry expertise to deliver solutions that are not only feature-rich but also incredibly easy to use. From small businesses to enterprise clients, we scale with your needs.",
      },
      recognition: {
        title: "Industry Recognition",
        subtitle: "Trusted by leading organizations",
        item1: "SOC 2 Type II Certified",
        item2: "G2 Leader in Loyalty Management 2024",
        item3: "GDPR & CCPA Compliant Platform",
      },
      values: {
        badge: "Our Values",
        title: "What Drives Us Forward",
        subtitle: "The principles that guide everything we do",
        innovation: {
          title: "Innovation First",
          description: "We constantly push boundaries, adopting the latest technologies to deliver cutting-edge solutions that keep our clients ahead of the competition.",
        },
        results: {
          title: "Results-Driven",
          description: "We measure our success by your success. Every feature we build is designed to deliver measurable ROI and drive real business outcomes.",
        },
        partnership: {
          title: "True Partnership",
          description: "We don't just provide software - we become your strategic partner, offering dedicated support and expertise every step of the way.",
        },
      },
      cta: {
        title: "Ready to Transform Your Customer Loyalty?",
        subtitle: "Join hundreds of businesses that trust Loyaltify to power their customer retention strategies.",
        bookDemo: "Schedule a Demo",
        contact: "Contact Us",
      },
    },
    legal: {
      backToHome: "Back to Home",
      lastUpdated: "Last Updated",
      terms: {
        title: "Terms of Service",
        acceptance: {
          title: "1. Acceptance of Terms",
          content: "By accessing and using Loyaltify's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
        },
        services: {
          title: "2. Description of Services",
          content: "Loyaltify provides a comprehensive loyalty program platform including:",
          item1: "Customer loyalty program management",
          item2: "Points, rewards, and tier systems",
          item3: "Analytics and reporting tools",
          item4: "Integration with POS and e-commerce platforms",
        },
        account: {
          title: "3. Account Responsibilities",
          content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
        },
        data: {
          title: "4. Data Usage",
          content: "You retain all rights to your customer data. Loyaltify will not sell or share your data with third parties except as required to provide our services or as required by law. We comply with GDPR, CCPA, and other applicable data protection regulations.",
        },
        fees: {
          title: "5. Fees and Payment",
          content: "Fees for our services are described in your service agreement. Payment is due according to the terms specified in your contract. We reserve the right to modify our pricing with 30 days advance notice.",
        },
        termination: {
          title: "6. Termination",
          content: "Either party may terminate this agreement with 30 days written notice. Upon termination, you will have 60 days to export your data from our platform. We reserve the right to immediately suspend access for violations of these terms.",
        },
        limitation: {
          title: "7. Limitation of Liability",
          content: "Loyaltify shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.",
        },
        contact: {
          title: "8. Contact Information",
          content: "For questions about these Terms of Service, please contact us at",
        },
      },
      privacy: {
        title: "Privacy Policy",
        intro: {
          title: "1. Introduction",
          content: "Loyaltify is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our loyalty platform services.",
        },
        collection: {
          title: "2. Information We Collect",
          content: "We collect information that you provide directly to us, including:",
          item1: "Account information (name, email, company details)",
          item2: "Customer data you upload to our platform",
          item3: "Usage data and analytics",
          item4: "Payment and billing information",
        },
        usage: {
          title: "3. How We Use Your Information",
          content: "We use the information we collect to:",
          item1: "Provide, maintain, and improve our services",
          item2: "Process transactions and send related information",
          item3: "Send technical notices and support messages",
          item4: "Respond to your comments and questions",
        },
        sharing: {
          title: "4. Information Sharing",
          content: "We do not sell your personal information. We may share your information only with your consent, to comply with laws, to provide our services through trusted partners, or to protect rights and safety.",
        },
        security: {
          title: "5. Data Security",
          content: "We implement appropriate technical and organizational measures to protect your data, including encryption, access controls, and regular security assessments. We are SOC 2 Type II compliant and follow industry best practices.",
        },
        rights: {
          title: "6. Your Rights",
          content: "You have the right to:",
          item1: "Access and receive a copy of your personal data",
          item2: "Correct inaccurate or incomplete data",
          item3: "Request deletion of your data",
          item4: "Object to or restrict processing of your data",
        },
        cookies: {
          title: "7. Cookies and Tracking",
          content: "We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
        },
        contact: {
          title: "8. Contact Us",
          content: "If you have questions about this Privacy Policy, please contact us at",
        },
      },
    },
  },
  "pt-BR": {
    header: {
      features: "Recursos",
      solutions: "Soluções",
      about: "Sobre Nós",
      contact: "Contato",
      bookDemo: "Agendar Demo",
    },
    hero: {
      title: "A plataforma de fidelidade Data-Driven",
      titleHighlight: "que vai impulsionar",
      titleEnd: "o seu negócio.",
      subtitle: "Soluções eficientes, confiáveis e orientadas por dados para aumentar a retenção de clientes e maximizar o valor vitalício.",
      bookDemo: "Agendar Demo",
      viewDocs: "Ver Documentação",
    },
    trustBar: {
      soc2: "Conformidade SOC 2 Tipo II",
      gdpr: "Pronto para GDPR e CCPA",
      g2: "Líder G2 2024",
      uptime: "SLA de 99,9% de Disponibilidade",
      trusted: "Confiado pelas principais marcas do Canadá",
      client: "Cliente",
    },
    features: {
      title: "Crie o programa de fidelidades do seu negócio.",
      titleHighlight: "100% Customizável.",
      subtitle: "Fidelize clientes do seu jeito, criando o seu próprio programa de fidelidade que se adapta ao seu negócio e converte visitas em clientes fiéis.",
      forYourCustomer: "Para o seu cliente:",
      cashback: {
        title: "Cashback",
        description: "Crie e Gerencie seu próprio programa de cashback",
      },
      promotions: {
        title: "Promoções customizáveis",
        description: "Crie promoções customizadas para itens ou combos de produtos e/ou serviços e direcione para uma base de clientes específica",
      },
      subscription: {
        title: "Crie Planos de Assinatura",
        description: "Fidelize seus clientes através de planos personalizados com recorrência mensal/trimestral/anual",
      },
      gamification: {
        title: "Gamificação",
        description: "Engaje clientes com pontos, distintivos e desafios",
      },
      coupons: {
        title: "Cupons e Vouchers",
        description: "Crie códigos de desconto dinâmicos e campanhas promocionais",
      },
      tiered: {
        title: "Níveis Escalonados",
        description: "Construa programas de recompensa sofisticados baseados em níveis",
      },
      referral: {
        title: "Programas de Indicação",
        description: "Transforme clientes em defensores da marca",
      },
    },
    solutions: {
      title: "Soluções flexíveis para",
      titleHighlight: "Qualquer Indústria",
      subtitle: "Recursos construídos sob medida para o seu negócio. Implemente em dias, não meses.",
      restaurants: {
        title: "Restaurantes",
        description: "Aumente as visitas recorrentes com recompensas baseadas em pontos, ofertas de aniversário e benefícios exclusivos para membros.",
        feature1: "Integração com seu PDV",
        feature2: "Integre com seu sistema de reservas",
        feature3: "Suporte para múltiplas unidades",
        feature4: "Cardápio customizável por unidade",
      },
      retail: {
        title: "Varejo",
        description: "Aumente o tamanho da cesta com membros em níveis, campanhas sazonais e ofertas personalizadas.",
        feature1: "Integre com seu PDV",
        feature2: "Giftcards Customizáveis",
        feature3: "Promoções baseadas em estoque para otimizar vendas",
      },
      services: {
        title: "Serviços",
        description: "Construa relacionamentos duradouros e aumente a recorrência de seus clientes.",
        feature1: "Sistema de agendamento de recompensas",
        feature2: "Rastreamento de frequência",
        feature3: "Programas de indicação",
      },
      learnMore: "Saiba Mais",
    },
    adminFeatures: {
      title: "Controle Administrativo Completo",
      subtitle: "Ferramentas poderosas de gestão para otimizar seu programa de fidelidade",
      sectionTitle: "Para a sua gestão:",
      segmentation: {
        title: "Lista de segmentações",
        description: "Crie listas segmentadas para campanhas de e-mail e SMS",
      },
      pushNotifications: {
        title: "Notificações push",
        description: "Conecte-se diretamente com seus clientes",
      },
      customMetrics: {
        title: "Métricas personalizadas",
        description: "Monitore métricas importantes em tempo real",
      },
      multiUnit: {
        title: "Gestão Multi-Unidades",
        description: "Gerencie várias unidades com catálogos e promoções únicas, tudo em uma só plataforma",
      },
    },
    cta: {
      title: "Comece a aumentar sua retenção hoje",
      subtitle: "Comece já a crescer o seu negócio com um programa de fidelidade orientado a dados. #Data is the New Oil",
      bookDemo: "Agendar Demo",
      talkToSales: "Falar com Vendas",
      noCredit: "Sem necessidade de cartão de crédito",
      freeTrial: "Teste gratuito de 14 dias",
      cancelAnytime: "Cancele quando quiser",
      sandboxInfo: "Teste gratuitamente todas as funcionalidades por 14 dias através de um ambiente sandbox dedicado.",
    },
    demo: {
      title: "Agende sua Demonstração",
      subtitle: "Descubra como a plataforma de fidelidade da Loyaltify, orientada por dados, pode impulsionar sua receita.",
      trustedBy: "Empresas canadenses líderes confiam em nós:",
      benefits: {
        efficient: {
          title: "Eficiente",
          description: "Otimize seu programa de fidelidade com ferramentas poderosas.",
        },
        datadriven: {
          title: "Orientado a Dados",
          description: "Tome decisões baseadas em insights reais de clientes.",
        },
        reliable: {
          title: "Confiável",
          description: "Uma plataforma robusta projetada para escalar com seu negócio.",
        },
      },
      form: {
        title: "Comece Hoje Mesmo",
        subtitle: "Preencha o formulário e nossa equipe entrará em contato em breve.",
        firstName: "Nome",
        firstNamePlaceholder: "João",
        lastName: "Sobrenome",
        lastNamePlaceholder: "Silva",
        workEmail: "E-mail Corporativo",
        workEmailPlaceholder: "joao@empresa.com",
        company: "Nome da Empresa",
        companyPlaceholder: "Sua Empresa",
        locations: "Número de Estabelecimentos",
        locationsPlaceholder: "Selecione o número de estabelecimentos",
        submit: "Solicitar Demo",
        submitting: "Enviando...",
        compliance: "Ao enviar este formulário, você concorda em receber comunicações da Loyaltify. Respeitamos sua privacidade e nunca compartilharemos suas informações.",
        success: {
          title: "Demo Solicitada com Sucesso!",
          description: "Nossa equipe entrará em contato em até 24 horas.",
        },
        errors: {
          firstNameRequired: "Nome é obrigatório",
          firstNameMax: "Nome deve ter menos de 50 caracteres",
          lastNameRequired: "Sobrenome é obrigatório",
          lastNameMax: "Sobrenome deve ter menos de 50 caracteres",
          emailRequired: "E-mail corporativo é obrigatório",
          emailInvalid: "Por favor, insira um e-mail válido",
          emailMax: "E-mail deve ter menos de 100 caracteres",
          companyRequired: "Nome da empresa é obrigatório",
          companyMax: "Nome da empresa deve ter menos de 100 caracteres",
          locationsRequired: "Por favor, selecione o número de estabelecimentos",
        },
      },
    },
    footer: {
      description: "A plataforma de fidelidade orientada a dados para empresas modernas.",
      product: "Produto",
      features: "Recursos",
      solutions: "Soluções",
      pricing: "Preços",
      integrations: "Integrações",
      documentation: "Documentação",
      company: "Empresa",
      about: "Sobre Nós",
      careers: "Carreiras",
      contact: "Contato",
      blog: "Blog",
      rights: "Todos os direitos reservados.",
      copyright: "© 2025 Loyaltify. Todos os direitos reservados.",
      developed: "Desenvolvido com",
      privacyPolicy: "Política de Privacidade",
      termsOfService: "Termos de Serviço",
    },
    about: {
      badge: "Sobre a Loyaltify",
      hero: {
        title: "Revolucionando a Fidelidade do Cliente com",
        titleHighlight: "Dados e Tecnologia",
        subtitle: "Somos uma equipe de inovadores, desenvolvedores e especialistas em fidelidade dedicados a ajudar empresas a construir relacionamentos mais fortes com seus clientes através de tecnologia de ponta.",
      },
      stats: {
        clients: "Clientes Ativos",
        uptime: "Disponibilidade da Plataforma",
        transactions: "Transações de Fidelidade",
        support: "Suporte ao Cliente",
      },
      mission: {
        badge: "Nossa Missão",
        title: "Capacitando Empresas Através da Fidelidade Inteligente",
        description: "Na Loyaltify, acreditamos que a fidelidade do cliente é a pedra angular do crescimento empresarial sustentável. Nossa missão é fornecer às empresas a plataforma de fidelidade mais avançada e orientada por dados que transforma clientes ocasionais em defensores vitalícios.",
        description2: "Combinamos tecnologia poderosa com profunda expertise do setor para entregar soluções que não são apenas ricas em recursos, mas também incrivelmente fáceis de usar. De pequenas empresas a clientes corporativos, escalamos com suas necessidades.",
      },
      recognition: {
        title: "Reconhecimento do Setor",
        subtitle: "Confiado por organizações líderes",
        item1: "Certificado SOC 2 Tipo II",
        item2: "Líder G2 em Gestão de Fidelidade 2024",
        item3: "Plataforma Compatível com GDPR e LGPD",
      },
      values: {
        badge: "Nossos Valores",
        title: "O Que Nos Move Para Frente",
        subtitle: "Os princípios que guiam tudo o que fazemos",
        innovation: {
          title: "Inovação em Primeiro Lugar",
          description: "Estamos constantemente ultrapassando limites, adotando as mais recentes tecnologias para entregar soluções de ponta que mantêm nossos clientes à frente da concorrência.",
        },
        results: {
          title: "Orientado a Resultados",
          description: "Medimos nosso sucesso pelo seu sucesso. Cada recurso que construímos é projetado para entregar ROI mensurável e gerar resultados reais de negócios.",
        },
        partnership: {
          title: "Parceria Verdadeira",
          description: "Não fornecemos apenas software - nos tornamos seu parceiro estratégico, oferecendo suporte dedicado e expertise em cada etapa do caminho.",
        },
      },
      cta: {
        title: "Pronto Para Transformar a Fidelidade dos Seus Clientes?",
        subtitle: "Junte-se a centenas de empresas que confiam na Loyaltify para potencializar suas estratégias de retenção de clientes.",
        bookDemo: "Agendar Demo",
        contact: "Entre em Contato",
      },
    },
    legal: {
      backToHome: "Voltar ao Início",
      lastUpdated: "Última Atualização",
      terms: {
        title: "Termos de Serviço",
        acceptance: {
          title: "1. Aceitação dos Termos",
          content: "Ao acessar e usar os serviços da Loyaltify, você concorda em estar vinculado a estes Termos de Serviço. Se você não concordar com estes termos, por favor, não use nossos serviços.",
        },
        services: {
          title: "2. Descrição dos Serviços",
          content: "A Loyaltify fornece uma plataforma abrangente de programas de fidelidade incluindo:",
          item1: "Gerenciamento de programas de fidelidade de clientes",
          item2: "Sistemas de pontos, recompensas e níveis",
          item3: "Ferramentas de análise e relatórios",
          item4: "Integração com plataformas de PDV e e-commerce",
        },
        account: {
          title: "3. Responsabilidades da Conta",
          content: "Você é responsável por manter a confidencialidade das credenciais de sua conta e por todas as atividades que ocorram sob sua conta. Você concorda em nos notificar imediatamente sobre qualquer uso não autorizado de sua conta.",
        },
        data: {
          title: "4. Uso de Dados",
          content: "Você retém todos os direitos sobre seus dados de clientes. A Loyaltify não venderá ou compartilhará seus dados com terceiros, exceto conforme necessário para fornecer nossos serviços ou conforme exigido por lei. Cumprimos com GDPR, LGPD e outros regulamentos aplicáveis de proteção de dados.",
        },
        fees: {
          title: "5. Taxas e Pagamento",
          content: "As taxas por nossos serviços estão descritas em seu contrato de serviço. O pagamento é devido de acordo com os termos especificados em seu contrato. Reservamo-nos o direito de modificar nossos preços com 30 dias de antecedência.",
        },
        termination: {
          title: "6. Rescisão",
          content: "Qualquer uma das partes pode rescindir este acordo com aviso prévio de 30 dias por escrito. Após a rescisão, você terá 60 dias para exportar seus dados de nossa plataforma. Reservamo-nos o direito de suspender imediatamente o acesso por violações destes termos.",
        },
        limitation: {
          title: "7. Limitação de Responsabilidade",
          content: "A Loyaltify não será responsável por quaisquer danos indiretos, incidentais, especiais ou consequenciais decorrentes do uso de nossos serviços. Nossa responsabilidade total não excederá as taxas pagas por você nos 12 meses anteriores à reclamação.",
        },
        contact: {
          title: "8. Informações de Contato",
          content: "Para perguntas sobre estes Termos de Serviço, entre em contato conosco em",
        },
      },
      privacy: {
        title: "Política de Privacidade",
        intro: {
          title: "1. Introdução",
          content: "A Loyaltify está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você usa nossos serviços de plataforma de fidelidade.",
        },
        collection: {
          title: "2. Informações que Coletamos",
          content: "Coletamos informações que você nos fornece diretamente, incluindo:",
          item1: "Informações da conta (nome, e-mail, detalhes da empresa)",
          item2: "Dados de clientes que você carrega em nossa plataforma",
          item3: "Dados de uso e análise",
          item4: "Informações de pagamento e faturamento",
        },
        usage: {
          title: "3. Como Usamos Suas Informações",
          content: "Usamos as informações que coletamos para:",
          item1: "Fornecer, manter e melhorar nossos serviços",
          item2: "Processar transações e enviar informações relacionadas",
          item3: "Enviar avisos técnicos e mensagens de suporte",
          item4: "Responder aos seus comentários e perguntas",
        },
        sharing: {
          title: "4. Compartilhamento de Informações",
          content: "Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas com seu consentimento, para cumprir leis, fornecer nossos serviços através de parceiros confiáveis ou para proteger direitos e segurança.",
        },
        security: {
          title: "5. Segurança de Dados",
          content: "Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados, incluindo criptografia, controles de acesso e avaliações regulares de segurança. Somos compatíveis com SOC 2 Tipo II e seguimos as melhores práticas do setor.",
        },
        rights: {
          title: "6. Seus Direitos",
          content: "Você tem o direito de:",
          item1: "Acessar e receber uma cópia de seus dados pessoais",
          item2: "Corrigir dados imprecisos ou incompletos",
          item3: "Solicitar exclusão de seus dados",
          item4: "Objetar ou restringir o processamento de seus dados",
        },
        cookies: {
          title: "7. Cookies e Rastreamento",
          content: "Usamos cookies e tecnologias de rastreamento semelhantes para rastrear atividades em nosso serviço e manter certas informações. Você pode instruir seu navegador a recusar todos os cookies ou indicar quando um cookie está sendo enviado.",
        },
        contact: {
          title: "8. Fale Conosco",
          content: "Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco em",
        },
      },
    },
  },
} satisfies Record<Language, TranslationNode>;
