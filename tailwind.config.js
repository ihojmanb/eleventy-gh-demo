// let remark = require('remark')
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  // mode: "jit",
  purge: {
    enabled: true,
    content: [
      "./.eleventy.js",
      "./src/_includes/**/*.njk",
      "./src/_layouts/**/*.njk",
      "./src/_books/**/*.njk",
      "./src/_books/**/*.json",
      "./src/pages/**/*.{md,njk,json}",
      "./src/scripts/**/*.js",
      "./src/styles/**/*.css",
      "./src/tests/**/*.js",
      "./src/writing/**/*.md",
      "./src/writing/**/*.json",
      "./src/index.njk",
      "./src/**/*.js",
    ],
    // transform: {
    //   md: (content) => {
    //     return remark().proces(content)
    //   }
    // }
  },
  theme: {
    extend: {
      fontFamily: {
        body: ["IBM Plex Sans"],
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-underline-utils"),
    function ({ addUtilities }) {
      const extendUnderline = {
        ".underline-magenta": {
          textDecoration: "underline",
          "text-decoration-color": "#FF00FF",
        },
      };
      addUtilities(extendUnderline);
    },
  ],
};
