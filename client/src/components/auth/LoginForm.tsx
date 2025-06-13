import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query"
import { authService } from "@/services/auth-service";
import { toast } from "react-hot-toast";
import { AuthType } from "@/types/authType";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
    email: z.string().email("Geçerli bir email adresi girin"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
})

export type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ["post/login"],
        mutationFn: (data: LoginFormData) => authService.login(data),
        onSuccess: (data: AuthType) => {
            toast.success("Login successful");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/", { replace: true });
        },
        onError: (error: unknown) => {
            if (error && typeof error === "object" && "response" in error) {
                const err = error as any;
                const errorMessage = err.response?.data?.message ?? "Bilinmeyen bir hata oluştu";
                toast.error(errorMessage);
            } else {
                toast.error("Sunucuya ulaşılamıyor.");
            }
        }

    })

    const handleLoginFormSubmit = (data: LoginFormData) => {
        mutate(data);
    }

    return (
        <motion.form
            onSubmit={handleSubmit(handleLoginFormSubmit)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hoş Geldiniz</h2>

            <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                </label>
                <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                    <input
                        {...register("email", { required: "Email zorunludur" })}
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all `}
                        placeholder="email@example.com"
                    />
                </motion.div>
                {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email.message}!</p>}
            </div>

            <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Şifre
                </label>
                <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                    <input
                        {...register("password")}
                        type="password"
                        id="password"
                        name="password"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all `}
                        placeholder="******"
                    />

                </motion.div>
                {errors.password && <p className="text-red-500 text-xs font-medium">{errors.password.message}!</p>}
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm">
                    <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                        Şifremi unuttum
                    </a>
                </div>
            </div>

            <button
                disabled={isPending}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
                {isPending ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
        </motion.form>
    )
}