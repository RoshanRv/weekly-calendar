/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "pri-dark": "#5462f6",
                "pri-light": "#e5e8fd",
            },
            fontFamily: {
                disp: ["Nunito", "sans-serif"],
            },
        },
    },
    plugins: [],
}
