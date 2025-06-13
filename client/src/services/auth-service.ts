import { LoginFormData } from "@/components/auth/LoginForm";
import { ReturnRespTypes, SubmitRegister } from "@/components/auth/RegisterForm";
import { httpClient } from "@/config/httpClient";
import { AuthType } from "@/types/authType";

interface AuthServiceTypes {
    login(data: LoginFormData): Promise<AuthType>;
    regitser(data: SubmitRegister): Promise<ReturnRespTypes>;
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
}

export const authService = new AuthService();