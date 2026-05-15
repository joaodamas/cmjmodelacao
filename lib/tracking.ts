"use client";

import { logEvent } from "firebase/analytics";
import { getFirebaseAnalytics } from "@/lib/firebase";

type TrackingPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackConversion(eventName: string, payload: TrackingPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const eventPayload = {
    event_category: "lead",
    ...payload
  };

  window.dataLayer?.push({ event: eventName, ...eventPayload });
  window.gtag?.("event", eventName, eventPayload);

  if (eventName === "generate_lead" || eventName === "quote_form_submit") {
    window.fbq?.("track", "Lead", eventPayload);
  } else {
    window.fbq?.("trackCustom", eventName, eventPayload);
  }

  void getFirebaseAnalytics().then((analytics) => {
    if (analytics) {
      logEvent(analytics, eventName, eventPayload);
    }
  });
}
