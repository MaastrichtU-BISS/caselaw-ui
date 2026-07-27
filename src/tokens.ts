export const caselawTheme = {
  color: {
    bg: "#f8fafc",
    grid: "rgba(148, 163, 184, 0.14)",
    card: "#ffffff",
    border: "#d9e1ec",
    text: "#111827",
    muted: "#667085",
    primary: "#2f63ee",
    primaryHover: "#2454d6",
    danger: "#c4161c",
    focus: "rgba(47, 99, 238, 0.24)",
  },
  radius: {
    sm: "6px",
    md: "8px",
    pill: "999px",
  },
  shadow: {
    card: "0 20px 54px rgba(15, 23, 42, 0.08)",
  },
  typeScale: {
    eyebrow: "0.74rem",
    body: "1rem",
    lead: "1.2rem",
    h1: "clamp(3rem, 7vw, 6.75rem)",
    h2: "clamp(1.45rem, 2vw, 2rem)",
  },
} as const;

export type CaselawTheme = typeof caselawTheme;

export type CleLink = {
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
