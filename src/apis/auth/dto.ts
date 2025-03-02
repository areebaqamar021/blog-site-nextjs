export type LoginInput = {
    email: string;
    password: string;
}

export type SignUpInput = {
    email: string;
    username: string;
    password: string;
}

export type SignInType = "login" | "signup"

export type AuthInput = {
    type: SignInType,
    input: LoginInput | SignUpInput
}