export interface IRegistrationDetails {
    email: string,
    password: string,
    confirmationPassword: string,
    linkedIn: string,
    github: string,
    owner: "candidate" | "employer" | "",
}

export interface ILogin {
    email: string,
    password: string,
}