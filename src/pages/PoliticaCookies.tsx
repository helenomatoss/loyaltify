import DemoHeader from "@/components/DemoHeader";
import DemoFooter from "@/components/DemoFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet";

const PoliticaCookies = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Política de Cookies e Privacidade - Loyaltify</title>
        <meta 
          name="description" 
          content="Política de Cookies e Privacidade da Loyaltify. Saiba como utilizamos cookies e como gerenciar suas preferências."
        />
        <meta property="og:title" content="Política de Cookies e Privacidade - Loyaltify" />
        <meta property="og:description" content="Política de Cookies e Privacidade da Loyaltify. Saiba como utilizamos cookies e como gerenciar suas preferências." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://loyaltify.com/politica-cookies" />
      </Helmet>

      <div className="min-h-screen bg-background font-pathway flex flex-col">
        <DemoHeader />
        <Breadcrumbs />

        <main className="flex-1 py-16 px-6 relative">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-sm">
              <h1 className="text-4xl md:text-5xl font-bold font-pathway mb-6 text-foreground">
                Política de Cookies e Privacidade
              </h1>
              
              <p className="text-sm text-muted-foreground mb-8">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>

              <div className="space-y-8 text-foreground">
                {/* O que são Cookies */}
                <section>
                  <h2 className="text-2xl font-bold font-pathway mb-4 text-foreground">
                    1. O que são Cookies?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, tablet ou smartphone) 
                    quando você visita um website. Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente, 
                    bem como para fornecer informações aos proprietários do site.
                  </p>
                </section>

                {/* Como usamos os Cookies */}
                <section>
                  <h2 className="text-2xl font-bold font-pathway mb-4 text-foreground">
                    2. Como usamos os Cookies?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    A Loyaltify utiliza cookies para melhorar a experiência do usuário, analisar o tráfego do site e 
                    personalizar o conteúdo. Os cookies nos ajudam a:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Manter você conectado durante sua visita</li>
                    <li>Lembrar suas preferências e configurações</li>
                    <li>Entender como você usa nosso site para melhorá-lo</li>
                    <li>Personalizar o conteúdo e anúncios que você vê</li>
                    <li>Medir a eficácia de nossas campanhas de marketing</li>
                  </ul>
                </section>

                {/* Tipos de Cookies */}
                <section>
                  <h2 className="text-2xl font-bold font-pathway mb-4 text-foreground">
                    3. Tipos de Cookies que utilizamos
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border">
                      <h3 className="text-xl font-semibold font-pathway mb-2 text-foreground">
                        3.1. Cookies Essenciais (Necessários)
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Estes cookies são estritamente necessários para o funcionamento do nosso site. Eles permitem que você 
                        navegue pelo site e use suas funcionalidades básicas, como acessar áreas seguras. Sem estes cookies, 
                        serviços essenciais não podem ser fornecidos.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        Estes cookies não podem ser desativados.
                      </p>
                    </div>

                    <div className="p-4 bg-card rounded-lg border border-border">
                      <h3 className="text-xl font-semibold font-pathway mb-2 text-foreground">
                        3.2. Cookies de Análise e Performance
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Estes cookies coletam informações sobre como os visitantes usam nosso site, como quais páginas são 
                        mais visitadas e se recebem mensagens de erro. Todas as informações coletadas são anônimas e usadas 
                        apenas para melhorar o funcionamento do site.
                      </p>
                      <p className="text-sm text-primary mt-2 font-medium">
                        Você pode desativar estes cookies nas suas preferências.
                      </p>
                    </div>

                    <div className="p-4 bg-card rounded-lg border border-border">
                      <h3 className="text-xl font-semibold font-pathway mb-2 text-foreground">
                        3.3. Cookies de Marketing e Publicidade
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Estes cookies são usados para rastrear visitantes em diferentes sites. A intenção é exibir anúncios 
                        que sejam relevantes e envolventes para o usuário individual. Eles também podem ser usados para limitar 
                        o número de vezes que você vê um anúncio e medir a eficácia das campanhas publicitárias.
                      </p>
                      <p className="text-sm text-primary mt-2 font-medium">
                        Você pode desativar estes cookies nas suas preferências.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Gerenciar Preferências */}
                <section>
                  <h2 className="text-2xl font-bold font-pathway mb-4 text-foreground">
                    4. Como gerenciar suas preferências de Cookies?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Você tem total controle sobre quais cookies aceitar. Você pode:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Aceitar ou rejeitar todos os cookies não essenciais através do banner de cookies</li>
                    <li>Personalizar suas preferências clicando em "Personalizar Preferências"</li>
                    <li>Alterar suas configurações a qualquer momento acessando esta página</li>
                    <li>Configurar seu navegador para bloquear ou alertá-lo sobre cookies</li>
                  </ul>
                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <p className="text-foreground font-medium">
                      ⚠️ Importante: Bloquear alguns tipos de cookies pode afetar sua experiência no site e 
                      os serviços que podemos oferecer.
                    </p>
                  </div>
                </section>

                {/* Cookies de Terceiros */}
                <section>
                  <h2 className="text-2xl font-bold font-pathway mb-4 text-foreground">
                    5. Cookies de Terceiros
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Em alguns casos, também usamos cookies fornecidos por terceiros confiáveis. Isso inclui serviços 
                    como Google Analytics para análise de tráfego e plataformas de publicidade para exibir anúncios 
                    relevantes. Estes terceiros também podem usar cookies, sobre os quais não temos controle direto.
                  </p>
                </section>

                {/* Alterações nesta Política */}
                <section>
                  <h2 className="text-2xl font-bold font-pathway mb-4 text-foreground">
                    6. Alterações nesta Política de Cookies
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças em nossas práticas 
                    ou por outras razões operacionais, legais ou regulamentares. Recomendamos que você revise esta página 
                    regularmente para se manter informado sobre como usamos cookies.
                  </p>
                </section>

                {/* Contato */}
                <section>
                  <h2 className="text-2xl font-bold font-pathway mb-4 text-foreground">
                    7. Contato
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Se você tiver dúvidas sobre nossa Política de Cookies ou sobre como usamos cookies, 
                    entre em contato conosco:
                  </p>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
                    <p className="text-foreground">
                      <strong>Email:</strong>{" "}
                      <a href="mailto:privacy@loyaltify.com" className="text-primary hover:underline">
                        privacy@loyaltify.com
                      </a>
                    </p>
                    <p className="text-foreground mt-2">
                      <strong>Website:</strong>{" "}
                      <a href="https://loyaltify.com" className="text-primary hover:underline">
                        https://loyaltify.com
                      </a>
                    </p>
                  </div>
                </section>

                {/* Conformidade Legal */}
                <section className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Esta Política de Cookies está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) 
                    do Brasil e o Regulamento Geral de Proteção de Dados (GDPR) da União Europeia.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>

        <DemoFooter />
      </div>
    </>
  );
};

export default PoliticaCookies;
