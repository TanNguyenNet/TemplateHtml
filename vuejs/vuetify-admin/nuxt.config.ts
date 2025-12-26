// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    // Nuxt 4 uses app/ directory by default
    // No need to set srcDir explicitly

    ssr: false, // SPA mode for admin dashboard

    css: [
        'vuetify/styles',
        '@mdi/font/css/materialdesignicons.css',
        '~/assets/styles/main.scss'
    ],

    build: {
        transpile: ['vuetify']
    },

    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt'
    ],

    vite: {
        define: {
            'process.env.DEBUG': false
        },
        ssr: {
            noExternal: ['vuetify']
        }
    },

    // For Bun runtime
    nitro: {
        preset: 'bun'
    },

    app: {
        head: {
            title: 'Vuetify Admin',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Modern Admin Dashboard Template' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },

    compatibilityDate: '2024-12-26'
})
