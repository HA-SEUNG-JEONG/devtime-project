import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'digital-numbers': ['Digital Numbers', 'monospace'],
        pretendard: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      /* Tailwind v4에서는 @theme 지시어로 색상을 정의하므로 colors는 제거 */
      /* 색상은 src/index.css의 @theme 블록에서 colors.css의 CSS 변수를 참조 */
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        '48': '48px',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
