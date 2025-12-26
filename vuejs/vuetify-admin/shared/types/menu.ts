export interface MenuItem {
    title: string
    icon: string
    to?: string
    children?: MenuItem[]
    badge?: string | number
    badgeColor?: string
}
