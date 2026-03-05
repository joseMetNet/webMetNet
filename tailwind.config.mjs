/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#009AF6',
                dark: '#1E1E2A',
                accent: '#FF9414',
            },
            fontFamily: {
                sans: ['Nunito', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
