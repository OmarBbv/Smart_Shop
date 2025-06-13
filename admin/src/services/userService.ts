import httpClient from "@/config/apiConfig";
import { UserType } from "@/types/usserTypes"

interface userServiceProps {
    handleAllUser(): Promise<UserType[]>;
    handleGetUser(id: string): Promise<UserType>
}

class UserService implements userServiceProps {
    async handleAllUser(): Promise<UserType[]> {
        try {
            const res = await httpClient.get('/users');
            return res.data.data
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async handleGetUser(id: string): Promise<UserType> {
        try {
            const res = await httpClient.get(`/users/${id}`);
            console.log('user', res.data);
            return res.data
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export const userService = new UserService();