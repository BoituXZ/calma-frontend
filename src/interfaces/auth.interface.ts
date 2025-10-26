export interface RegisterUser {
    name: string
    emailAddress: string
    password: string
    role?: 'USER' | 'THERAPIST'
}



export interface LoginUser {
    email: string
    password: string
}