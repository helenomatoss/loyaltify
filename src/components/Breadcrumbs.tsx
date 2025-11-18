import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const Breadcrumbs = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const pathnames = location.pathname.split("/").filter((x) => x);
  
  // Generate structured data for breadcrumbs
  useEffect(() => {
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": window.location.origin
        },
        ...pathnames.map((path, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": path.charAt(0).toUpperCase() + path.slice(1),
          "item": `${window.location.origin}/${pathnames.slice(0, index + 1).join("/")}`
        }))
      ]
    };

    // Add or update script tag
    let script = document.querySelector('script[data-breadcrumb-schema]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-breadcrumb-schema', 'true');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(breadcrumbList);

    return () => {
      const scriptToRemove = document.querySelector('script[data-breadcrumb-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location.pathname, pathnames]);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  return (
    <div className="container mx-auto px-6 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathnames.map((path, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const label = path.charAt(0).toUpperCase() + path.slice(1);

            return (
              <div key={path} className="flex items-center gap-1.5">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={routeTo}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
