export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

export const useAuthController = (): {
    isAuthenticated: boolean;
    token: string | null;
    user: AuthUser | null;
} => {
    const token = localStorage.getItem("token");

    if (token) {
        const user = JSON.parse(localStorage.getItem("user") || "null");

        return {
            isAuthenticated: true,
            token,
            user,
        };
    }

    return {
        isAuthenticated: false,
        token: null,
        user: null,
    };
};
