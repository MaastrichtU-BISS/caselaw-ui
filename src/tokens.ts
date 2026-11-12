export const bissTheme = {
  color: {
    bg: "#FAF9F7",
    grid: "transparent",
    card: "#FFFFFF",
    border: "#E7E5E0",
    text: "#1D1C1A",
    muted: "#5E5C57",
    primary: "#005CA9",
    primaryHover: "#004A8A",
    danger: "#C2412F",
    focus: "rgba(0, 92, 169, 0.24)",
  },
  radius: {
    sm: "7px",
    md: "10px",
    pill: "999px",
  },
  shadow: {
    card: "0 1px 2px rgba(29, 28, 26, 0.04)",
  },
  typeScale: {
    eyebrow: "0.74rem",
    body: "1rem",
    lead: "1.2rem",
    h1: "clamp(2rem, 4vw, 3.5rem)",
    h2: "clamp(1.45rem, 2vw, 2rem)",
  },
} as const;

export type BissTheme = typeof bissTheme;

export type BissLink = {
  label: string;
  href: string;
  /** A different origin. Affects `rel`, not where the link opens. */
  external?: boolean;
  /**
   * Open in a new tab.
   *
   * Off by default, including for `external`. Moving between Case Law Explorer
   * products is ordinary navigation, and opening each one in its own tab left
   * people managing tabs they never asked for. Reserve this for third-party
   * destinations someone is unlikely to want to leave the page for.
   */
  newTab?: boolean;
};
