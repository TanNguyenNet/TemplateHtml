import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDark: false,
        primaryColor: '#1976D2',
        drawerMini: false
    }),

    actions: {
        toggleTheme() {
            this.isDark = !this.isDark
        },

        setPrimaryColor(color: string) {
            this.primaryColor = color
        },

        toggleDrawerMini() {
            this.drawerMini = !this.drawerMini
        }
    },

    persist: true
})
