/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0A0A0F",
                'bg-card': "#12121A",
                'neon-purple': "#9B5CFF",
                'neon-violet': "#8B5CF6",
                'neon-cyan': "#00E5FF",
                'neon-magenta': "#FF00E5",
                'text-primary': "#FFFFFF",
                'text-secondary': "#B3B3C6",
                border: "rgba(155, 92, 255, 0.2)",
            },
            borderRadius: {
                lg: "12px",
                xl: "20px",
            },
            fontFamily: {
                sans: ['Inter', 'DM Sans', 'sans-serif'],
                orbitron: ['Orbitron', 'sans-serif'],
                grotesk: ['Space Grotesk', 'sans-serif'],
                satoshi: ['Satoshi', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}

