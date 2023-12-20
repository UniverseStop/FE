import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
            custom: "600px",
        },
        fontFamily: {
            sans: ["Graphik", "sans-serif"],
            serif: ["Merriweather", "serif"],
        },
        backgroundImage: { login: "url('/images/login2.png')", mypage: "url('/images/mypage-background.png')"},
        extend: {
            spacing: {
                "128": "32rem",
                "144": "36rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            colors: {
                blue: "#1fb6ff",
                purple: "#7e5bef",
                pink: "#ff49db",
                orange: "#ff7849",
                green: "#13ce66",
                yellow: "#ffc82c",
                "gray-dark": "#273444",
                gray: "#8492a6",
                "gray-light": "#d3dce6",
                mainColor: "#BC8E8E"
            },

        },
    },
    plugins: [],
};
export default config;
