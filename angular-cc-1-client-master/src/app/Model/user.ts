export interface User extends Document {
    Username: string;
    Password: string;
    isAdmin: boolean;
    comparePassword: (candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void;
}