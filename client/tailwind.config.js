import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#000",
      secondary: {
        green: "#38CB89",
        blue: "#377DFF",
        orange: "#FFAB00",
        red: "#FF5630",
      },

      neutral: {
        "01": "#fefefe",
        "02": "#F3F5F7",
        "03": "#E8ECEF",
        "04": "#6C7275",
        "05": "#343839",
        "06": "#232627",
        "07": "#141718",
      },
    },
    extend: {
      fontSize: {
        hero: [
          "6rem",
          {
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "6rem",
            letterSpacing: "-0.12rem",
          },
        ],
        "heading-01": [
          "5rem",
          {
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "5.25rem",
            letterSpacing: "-0.1875rem",
          },
        ],
        "heading-02": [
          "4.5rem",
          {
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "4.75rem",
            letterSpacing: "-0.125rem",
          },
        ],
        "heading-03": [
          "3.375rem",
          {
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "3.625rem",
            letterSpacing: "-0.0625rem",
          },
        ],
        "heading-04": [
          "2.5rem",
          {
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "2.75rem",
            letterSpacing: "-0.025rem",
          },
        ],
        "heading-05": [
          "2.125rem",
          {
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "2.375rem",
            letterSpacing: "-0.0375rem",
          },
        ],
        "heading-06": [
          "1.75rem",
          {
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "2.125rem",
            letterSpacing: "-0.0375rem",
          },
        ],
        "heading-07": [
          "1.25rem",
          {
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "1.75rem",
          },
        ],
        "regular-01": [
          "1.625rem",
          {
            fontStyle: "normal",
            lineHeight: "2.5rem",
          },
        ],
        "regular-02": [
          "1.375rem",
          {
            fontStyle: "normal",
            lineHeight: "2.125rem",
          },
        ],
        "regular-03": [
          "1.25rem",
          {
            fontStyle: "normal",
            lineHeight: "2rem",
          },
        ],
        "regular-04": [
          "1.125rem",
          {
            fontStyle: "normal",
            lineHeight: "1.875rem",
          },
        ],
        "regular-05": [
          "1rem",
          {
            fontStyle: "normal",
            lineHeight: "1.625rem",
          },
        ],
        "regular-06": [
          "0.875rem",
          {
            fontStyle: "normal",
            lineHeight: "1.375rem",
          },
        ],
        "regular-07": [
          "0.75rem",
          {
            fontStyle: "normal",
            lineHeight: "1.25rem",
          },
        ],
        "btn-xl": [
          "1.625rem",
          {
            fontWeight: "500",
            lineHeight: "2.375rem",
          },
        ],
        "btn-l": [
          "1.375rem",
          {
            fontWeight: "500",
            lineHeight: "2.125rem",
          },
        ],
        "btn-m": [
          "1.125rem",
          {
            fontWeight: "500",
            lineHeight: "2rem",
            letterSpacing: "-0.025rem",
          },
        ],
        "btn-s": [
          "1rem",
          {
            fontWeight: "500",
            lineHeight: "1.75rem",
            letterSpacing: "-0.025rem",
          },
        ],
        "btn-xs": [
          "0.875rem",
          {
            fontWeight: "500",
            lineHeight: "1.5rem",
          },
        ],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".btn-xl": {},
        ".btn-l": {},
        ".btn-m": {},
        ".btn-s": {},
        ".btn-xs": {},
      };
      addUtilities(newUtilities);
    },
  ],
};
