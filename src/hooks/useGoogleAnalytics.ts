import { useEffect } from "react";

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const useGoogleAnalytics = () => {
  useEffect(() => {
    // Track page view on mount
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: window.location.pathname,
      });
    }
  }, []);

  const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  };

  const trackConversion = (conversionLabel: string, value?: number) => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: conversionLabel,
        value: value,
        currency: 'CAD',
      });
    }
  };

  return { trackEvent, trackConversion };
};
