// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  runtimeConfig: {
    public: {
      openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
    },
  },
});
