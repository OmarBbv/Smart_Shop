import { authService } from "@/services/auth-service"
import { AuthType } from "@/types/authType"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

const registerSchema = z.object({
    name: z.string().min(1, "İsim alanı boş bırakılamaz"),
    email: z.string().email("Geçerli bir email adresi girin"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
    confirmPassword: z.string().min(6, "Şifre tekrarı en az 6 karakter olmalı")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
})

export type RegisterFormDataType = z.infer<typeof registerSchema>
export type SubmitRegister = {
    name: string,
    password: string,
    email: string
}

export interface ReturnRespTypes {
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: number;
        updatedAt: string;
        createdAt: string;
    };
}
export function RegisterForm() {
    const navigate = useNavigate();
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const { mutate } = useMutation({
        mutationKey: ['post/regiister'],
        mutationFn: (newData: SubmitRegister) => authService.regitser(newData),
        onSuccess: async (loginData: ReturnRespTypes) => {
            toast.success("Qeydiyyat uğurla tamamlandı");
            const newData = {
                email: loginData.data.email || '',
                password: loginData.data.password || ''
            }
            const data: AuthType = await authService.login(newData);
            if (!data.token) return;

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user))
            navigate('/');
            reset();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Qeydiyyat zamanı bir hata oluştu");
        }
    })

    const handleRegisterSubmit = (data: RegisterFormDataType) => {
        const newData = {
            name: data.name || '',
            password: data.password || '',
            email: data.email || ""
        }
        mutate(newData);
    }

    return (
        <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
            onSubmit={handleSubmit(handleRegisterSubmit)}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hesap Oluştur</h2>

            <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    İsim
                </label>
                <div className="relative">
                    <input
                        {...register("name")}
                        type="text"
                        id="name"
                        name="name"
                        className={`w-full px-4 py-2  border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all `}
                        placeholder="Adınız Soyadınız"
                    />
                    {errors.name && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-1 font-medium"
                        >
                            {errors.name.message}
                        </motion.p>
                    )}
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="register-email" className="text-sm font-medium text-gray-700">
                    Email
                </label>
                <div className="relative">
                    <input
                        {...register("email")}
                        type="email"
                        id="register-email"
                        name="email"
                        className={`w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all `}
                        placeholder="email@example.com"
                    />
                    {errors.email && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-1 font-medium"
                        >
                            {errors.email.message}
                        </motion.p>
                    )}
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="register-password" className="text-sm font-medium text-gray-700">
                    Şifre
                </label>
                <div className="relative">
                    <input
                        {...register("password")}
                        type="password"
                        id="register-password"
                        name="password"
                        className={`w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all `}
                        placeholder="******"
                    />
                    {errors.password && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-1 font-medium"
                        >
                            {errors.password.message}
                        </motion.p>
                    )}
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                    Şifre Tekrarı
                </label>
                <div className="relative">
                    <input
                        {...register("confirmPassword")}
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        className={`w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all `}
                        placeholder="******"
                    />
                    {errors.confirmPassword && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-1 font-medium"
                        >
                            {errors.confirmPassword.message}
                        </motion.p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Qeydiyyatdan Keç
            </button>
        </motion.form>
    )
}
