import 'express-session';

declare module 'express-session' {
    interface SessionData {
        jwt: string;
        userId: number;
        username: string;
        isAdmin: boolean;
    }
}