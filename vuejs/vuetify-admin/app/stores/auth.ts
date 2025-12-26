import { defineStore } from 'pinia'
import type { User } from '~~/shared/types/user'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        token: null as string | null,
        isAuthenticated: false
    }),

    actions: {
        setUser(user: User) {
            this.user = user
            this.isAuthenticated = true
        },

        setToken(token: string) {
            this.token = token
        },

        logout() {
            this.user = null
            this.token = null
            this.isAuthenticated = false
        }
    },

    persist: true
})
