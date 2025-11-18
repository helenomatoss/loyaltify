import { useState, useEffect } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = 'loyaltify_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'loyaltify_cookie_preferences';

export const useCookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (!consent) {
      setShowBanner(true);
    }

    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const acceptAll = () => {
    const allPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allPreferences);
  };

  const rejectAll = () => {
    const minimalPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(minimalPreferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);

    // Load analytics and marketing scripts based on preferences
    if (prefs.analytics) {
      loadAnalyticsScripts();
    }
    if (prefs.marketing) {
      loadMarketingScripts();
    }
  };

  const loadAnalyticsScripts = () => {
    // Google Analytics or other analytics scripts
  };

  const loadMarketingScripts = () => {
    // Marketing and advertising scripts
  };

  const updatePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
  };

  const revokeCookies = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(COOKIE_PREFERENCES_KEY);
    setShowBanner(true);
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  return {
    showBanner,
    preferences,
    acceptAll,
    rejectAll,
    savePreferences,
    updatePreferences,
    revokeCookies,
    setShowBanner,
  };
};
