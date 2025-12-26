export interface User {
    id: number
    name: string
    email: string
    role: UserRole
    status: UserStatus
    avatar?: string
    createdAt: Date
    updatedAt: Date
}

export type UserRole = 'Admin' | 'Editor' | 'Viewer'
export type UserStatus = 'Active' | 'Inactive' | 'Pending'

export interface CreateUserDto {
    name: string
    email: string
    password: string
    role: UserRole
}

export interface UpdateUserDto {
    name?: string
    email?: string
    role?: UserRole
    status?: UserStatus
}
