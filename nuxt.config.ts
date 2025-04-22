// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      WEATHER_API_BASE_URL: process.env.WEATHER_API_BASE_URL,
      WEATHER_API_KEY: process.env.WEATHER_API_KEY
    }
  }
})