"use client";

import { useEffect, useState } from "react";

export type GeoState = {
  countryCode: string;
  currencyCode: string;
  currencySymbol: string;
  isCryptoAllowed: boolean;
  // Base monthly prices in local currency
  prices: { basic: number; standard: number; premium: number };
  isLoading: boolean;
};

export function useGeoPricing() {
  const [geoState, setGeoState] = useState<GeoState>({
    countryCode: "US",
    currencyCode: "USD",
    currencySymbol: "$",
    isCryptoAllowed: true,
    prices: { basic: 30, standard: 50, premium: 150 },
    isLoading: true,
  });

  useEffect(() => {
    async function fetchGeo() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const cc: string = data.country_code || "US";

        const EU = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"];

        let currencyCode = "USD";
        let currencySymbol = "$";
        let isCryptoAllowed = true;
        let prices = { basic: 30, standard: 50, premium: 150 };

        if (cc === "IN") {
          currencyCode = "INR";
          currencySymbol = "₹";
          isCryptoAllowed = false;
          prices = { basic: 2500, standard: 4200, premium: 12500 };
        } else if (EU.includes(cc)) {
          currencyCode = "EUR";
          currencySymbol = "€";
          isCryptoAllowed = true;
          prices = { basic: 28, standard: 46, premium: 138 };
        } else if (cc === "GB") {
          currencyCode = "GBP";
          currencySymbol = "£";
          isCryptoAllowed = true;
          prices = { basic: 24, standard: 40, premium: 120 };
        } else if (cc === "AU") {
          currencyCode = "AUD";
          currencySymbol = "A$";
          isCryptoAllowed = true;
          prices = { basic: 46, standard: 76, premium: 230 };
        } else if (cc === "CA") {
          currencyCode = "CAD";
          currencySymbol = "C$";
          isCryptoAllowed = true;
          prices = { basic: 41, standard: 68, premium: 205 };
        }
        // All other countries default to USD

        setGeoState({
          countryCode: cc,
          currencyCode,
          currencySymbol,
          isCryptoAllowed,
          prices,
          isLoading: false,
        });
      } catch {
        // Fallback to USD on any error
        setGeoState((prev) => ({ ...prev, isLoading: false }));
      }
    }

    fetchGeo();
  }, []);

  /**
   * Convert a USD price to local currency using the ratio of
   * the detected local base price vs USD base price.
   * Falls back to the raw USD value if not India.
   */
  const convertPrice = (usdBase: number) => {
    // Use the ratio from basic plan as the exchange rate proxy
    const rate = geoState.prices.basic / 30;
    return Math.round(usdBase * rate);
  };

  return { ...geoState, convertPrice };
}
