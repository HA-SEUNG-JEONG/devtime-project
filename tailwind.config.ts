import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4c79ff',
          '10': 'rgba(76, 121, 255, 0.1)',
          '30': 'rgba(76, 121, 255, 0.3)',
          '2': '#78b0ff',
        },
        indigo: {
          DEFAULT: '#023e99',
          light: '#a3c3ff',
        },
        informative: '#2563eb',
        negative: '#dc2626',
        notice: {
          DEFAULT: '#fbbf24',
          light: '#ffdb7f',
        },
        positive: {
          DEFAULT: '#22c55e',
          light: '#62ec95',
        },
        fuchsia: {
          DEFAULT: '#fd28ec',
          light: '#ff87f5',
        },
        gray: {
          DEFAULT: '#ffffff',
          '50': '#f9fafb',
          '100': '#f0f2f5',
          '200': '#e5e7eb',
          '300': '#ccd0d6',
          '400': '#969da8',
          '500': '#717887',
          '600': '#4b5563',
          '700': '#394252',
          '800': '#1f2937',
        },
      },
      maxWidth: {
        'container': '1280px',
      },
      spacing: {
        '48': '48px',
      },
    },
  },
  plugins: [],
};

export default config;

