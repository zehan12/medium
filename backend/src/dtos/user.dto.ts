export interface CreateUserDto {
    name?: string;
    username: string;
    email: string;
    password: string;
}

export interface LoginUserDto {
    username?: string;
    email?: string;
    password: string;
}
