/** @type {import('tailwindcss').Config} */
export default {
  // 防止样式冲突, 禁用默认样式
  corePlugins: {
    preflight: false
  },
  // purge // Since Tailwind no longer uses PurgeCSS under the hood, we’ve renamed the purge option to content to better
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // darkMode: false, // The dark mode feature is now enabled using the media strategy by default, so you can remove this key entirely from your tailwind.config.js file, unless you’re using the class strategy
  theme: {
    extend: {}
  },
  plugins: []
}
