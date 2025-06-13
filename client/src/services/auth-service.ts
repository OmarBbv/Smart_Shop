import { LoginFormData } from "@/components/auth/LoginForm";
import { ReturnRespTypes, SubmitRegister } from "@/components/auth/RegisterForm";
import { httpClient } from "@/config/httpClient";
import { AuthType } from "@/types/authType";
import toast from "react-hot-toast";

interface AuthServiceTypes {
    login(data: LoginFormData): Promise<AuthType>;
    regitser(data: SubmitRegister): Promise<ReturnRespTypes>;
    logout(): Promise<void>
}

class AuthService implements AuthServiceTypes {
    async login(data: LoginFormData): Promise<AuthType> {
        const res = await httpClient.post('/auth/signin', data);
        return res.data;
    };

    async regitser(data: SubmitRegister): Promise<ReturnRespTypes> {
        const res = await httpClient.post('/auth/signup', data);
        console.log('register', res.data)
        return res.data
    }

    async logout(): Promise<void> {
        try {
            const res = await httpClient.post('/auth/logout');
            return res.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'Bir hata oluştu. Lütfen tekrar deneyin.';
            toast.error(errorMessage);
        }
    }
}

export const authService = new AuthService();