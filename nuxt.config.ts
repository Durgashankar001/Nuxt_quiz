// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    nitro: {
        plugins: ["~/server/index.ts"]
    },

    runtimeConfig: {
        mongoURI: process.env.MONGO_URI
    },

    css: ["~/assets/main.css"],

})
