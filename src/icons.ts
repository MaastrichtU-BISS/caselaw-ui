export type CleServiceIconName = "explorer" | "database" | "access" | "api" | "auth" | "rate-limit";

export const cleServiceIconLabels: Record<CleServiceIconName, string> = {
  explorer: "Case law explorer",
  database: "Database workbench",
  access: "Access control",
  api: "Citations API",
  auth: "Authentication",
  "rate-limit": "Rate limiting",
};

export const cleServiceIconPaths: Record<CleServiceIconName, string> = {
  explorer:
    "M7.5 7.5a2.5 2.5 0 1 0 0 .01ZM16.5 7.5a2.5 2.5 0 1 0 0 .01ZM12 16.5a2.5 2.5 0 1 0 0 .01ZM9.7 8.4l4.6-.1M8.8 9.6l2.3 4.8M15.2 9.6l-2.3 4.8",
  database:
    "M5 7c0-2 3.1-3.5 7-3.5S19 5 19 7s-3.1 3.5-7 3.5S5 9 5 7ZM5 7v5c0 2 3.1 3.5 7 3.5s7-1.5 7-3.5V7M5 12v5c0 2 3.1 3.5 7 3.5s7-1.5 7-3.5v-5",
  access:
    "M12 3.5l7 3v5.3c0 4.4-2.8 7.4-7 8.7-4.2-1.3-7-4.3-7-8.7V6.5l7-3ZM9.5 12.5l1.7 1.7 3.6-4",
  api:
    "M8.5 7 5 12l3.5 5M15.5 7 19 12l-3.5 5M13.5 5.5l-3 13",
  auth:
    "M8 10V8a4 4 0 1 1 8 0v2M6.8 10h10.4c.7 0 1.3.6 1.3 1.3v7.2c0 .7-.6 1.3-1.3 1.3H6.8c-.7 0-1.3-.6-1.3-1.3v-7.2c0-.7.6-1.3 1.3-1.3ZM12 14v2.3",
  "rate-limit":
    "M12 5a7 7 0 1 0 7 7M12 12l4-4M8 20h8M9 3h6M12 3v2M18.5 5.5l1.5 1.5",
};

export function getCleServiceIconSvg(icon: CleServiceIconName, color = "#2f63ee", bg = "#ffffff"): string {
  const label = cleServiceIconLabels[icon];
  const path = cleServiceIconPaths[icon];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="${label}"><rect x="1" y="1" width="22" height="22" rx="6" fill="${bg}" stroke="#d9e1ec"/><path d="${path}" fill="none" stroke="${color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

export function getCleFaviconHref(icon: CleServiceIconName, color = "#2f63ee", bg = "#ffffff"): string {
  return `data:image/svg+xml,${encodeURIComponent(getCleServiceIconSvg(icon, color, bg))}`;
}

export function setCleFavicon(icon: CleServiceIconName, color = "#2f63ee", bg = "#ffffff"): HTMLLinkElement | undefined {
  if (typeof document === "undefined") return undefined;

  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"][data-cle-favicon="true"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.dataset.cleFavicon = "true";
    document.head.appendChild(link);
  }

  link.href = getCleFaviconHref(icon, color, bg);
  return link;
}
