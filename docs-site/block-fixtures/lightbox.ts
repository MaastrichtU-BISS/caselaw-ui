import type { Fixture } from '../fixtures';

const svg = (label: string) =>
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="#E9F1F9"/><text x="600" y="410" font-family="sans-serif" font-size="48" text-anchor="middle" fill="#005CA9">${label}</text></svg>`,
  );

export const fixture: Fixture = {
  props: {
    open: false,
    images: [
      { src: svg('Workshop'), alt: 'Workshop with the courts team', caption: 'Workshop with the courts team', credit: 'Photo: Research office' },
      { src: svg('Poster'), alt: 'Conference poster', caption: 'Conference poster, Maastricht' },
    ],
  },
};
