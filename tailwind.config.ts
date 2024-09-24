import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          0: "#E4EBF6",
          1: "#F4F4F5",
          2: "#E4E4E7",
          3: "#BECEE9",
          4: "#A1A1AA",
          5: "#71717A",
          6: "#3F3F46",
          7: "#52525B",
          8: "#FAFAFA",
        },
        secondary: {
          0: "#7195D0",
          1: "#2A4A7E",
          2: "#1D3357",
        },
        tertiary: {
          white: "#FFFFFF",
          red: "#D92D20",
          yellow: {
            0: "#FFA319",
            1: "#E58A00",
            2: "#B26B00",
          }
        }
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      rotate: {
        '270': '270deg',
      },
      width: {
        '150': '600px',
      },
      maxHeight: {
        '110': '440px',
      },
      zIndex: {
        '1000': '1000',
      }
    },
  },
  plugins: [],
};
export default config;
