/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "neon-green": "#39FF14", // Neon green for text highlights
                "neon-orange": "#FF6D00", // Neon orange for button accents
                "dark-gray": "#1c1c1c", // Dark gray for the background
                "deep-purple": "#3f0f3f", // Deep purple for a darker accent
                "ghost-white": "#f8f8ff", // Light gray for text against dark backgrounds
            },
            backgroundImage: {
                "login-background":
                    "url('/src/assets/loginpage_background.png')", // Replace with the correct image path
                "signup-background": "url('/src/assets/signup-bg.webp')",
                "purple-bg-db": "url('/src/assets/purple-bg-db.avif')",
            },
            boxShadow: {
                neon: "0 0 10px #39FF14", // Neon glow effect
            },
            animation: {
                "pulse-slow": "pulse 3s ease-in-out infinite", // Slow pulse for a spooky vibe
            },
            keyframes: {
                pulse: {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.6 },
                },
            },
        },
    },
    plugins: [],
};
