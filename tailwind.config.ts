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
        backgroundImage: {
            login: "url('/images/login.png')",
            loginMobile: "url('/images/login-Mobile.png')",
            mypageMobile: "url('/images/mypage-background-Mobile.png')",
            mypageDesktop: "url('/images/mypage-background-Desktop.png')",
        },
        extend: {
            spacing: {
                "128": "32rem",
                "144": "36rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            colors: {
                blue: "#0000FF",
                purple: "#7e5bef",
                pink: "#ff49db",
                orange: "#ff7849",
                green: "#13ce66",
                yellow: "#ffc82c",
                red: "#EB0000",
                "gray-dark": "#273444",
                gray: "#939393",
                "gray-light": "#d3dce6",
                mainColor: "#BC8E8E",
                postColor: "#F2F3F5",
                mainDivisionLine: "#191818",
                managerFontColor: "#858585",
                managerGrayColor: "#F5F5FA",
                managerColor: "#FBF9F9",
                managerPointColor: "#D4D4D4",
            },
            keyframes: {
                rotate: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(-360deg)" },
                },
            },
            animation: {
                "spin-slow": "rotate 3s linear infinite",
            },
        },
    },
    plugins: [],
};
export default config;
