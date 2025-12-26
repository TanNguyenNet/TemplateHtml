export const APP_NAME = 'Vuetify Admin'
export const APP_VERSION = '1.0.0'

export const ROLES = ['Admin', 'Editor', 'Viewer'] as const
export const STATUSES = ['Active', 'Inactive', 'Pending'] as const

export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
} as const
