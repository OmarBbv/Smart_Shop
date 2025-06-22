import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { LoginForm } from "@/components/auth/LoginForm"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="relative h-14">
            <div className="absolute inset-0 bg-gray-100 flex">
              <motion.div
                className="absolute h-full w-1/2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg"
                animate={{ x: isLogin ? "0%" : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              <div className="relative flex w-full">
                <div
                  className="w-1/2 h-full flex items-center justify-center cursor-pointer z-10"
                  onClick={() => setIsLogin(true)}
                >
                  <span
                    className={`font-medium transition-colors duration-300 ${isLogin ? "text-white" : "text-gray-700"}`}
                  >
                    Giriş
                  </span>
                </div>
                <div
                  className="w-1/2 h-full flex items-center justify-center cursor-pointer z-10"
                  onClick={() => setIsLogin(false)}
                >
                  <span
                    className={`font-medium transition-colors duration-300 ${!isLogin ? "text-white" : "text-gray-700"}`}
                  >
                    Kayıt
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {isLogin ? <LoginForm key="login" /> : <RegisterForm key="register" />}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


