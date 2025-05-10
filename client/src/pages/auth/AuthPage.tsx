import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
            {/* Tab background */}
            <div className="absolute inset-0 bg-gray-100 flex">
              {/* Sliding indicator */}
              <motion.div
                className="absolute h-full w-1/2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg"
                animate={{ x: isLogin ? "0%" : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {/* Tab buttons */}
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

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    const newErrors = {
      email: !formData.email ? "Email gerekli" : !formData.email.includes("@") ? "Geçerli bir email adresi girin" : "",
      password: !formData.password
        ? "Şifre gerekli"
        : formData.password.length < 6
          ? "Şifre en az 6 karakter olmalı"
          : "",
    }

    setErrors(newErrors)

    if (!newErrors.email && !newErrors.password) {
      // Submit form logic would go here
      console.log("Login form submitted", formData)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Hoş Geldiniz</h2>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <motion.div whileFocus={{ scale: 1.01 }} className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="email@example.com"
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </motion.div>
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Şifre
        </label>
        <motion.div whileFocus={{ scale: 1.01 }} className="relative">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="******"
          />
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.password}
            </motion.p>
          )}
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Beni hatırla
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Şifremi unuttum
          </a>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Giriş Yap
      </motion.button>
    </motion.form>
  )
}

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    const newErrors = {
      name: !formData.name ? "İsim gerekli" : "",
      email: !formData.email ? "Email gerekli" : !formData.email.includes("@") ? "Geçerli bir email adresi girin" : "",
      password: !formData.password
        ? "Şifre gerekli"
        : formData.password.length < 6
          ? "Şifre en az 6 karakter olmalı"
          : "",
      confirmPassword: !formData.confirmPassword
        ? "Şifre tekrarı gerekli"
        : formData.password !== formData.confirmPassword
          ? "Şifreler eşleşmiyor"
          : "",
    }

    setErrors(newErrors)

    if (!Object.values(newErrors).some((error) => error)) {
      // Submit form logic would go here
      console.log("Register form submitted", formData)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Hesap Oluştur</h2>

      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          İsim
        </label>
        <motion.div whileFocus={{ scale: 1.01 }} className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Adınız Soyadınız"
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.name}
            </motion.p>
          )}
        </motion.div>
      </div>

      <div className="space-y-1">
        <label htmlFor="register-email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <motion.div whileFocus={{ scale: 1.01 }} className="relative">
          <input
            type="email"
            id="register-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="email@example.com"
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </motion.div>
      </div>

      <div className="space-y-1">
        <label htmlFor="register-password" className="text-sm font-medium text-gray-700">
          Şifre
        </label>
        <motion.div whileFocus={{ scale: 1.01 }} className="relative">
          <input
            type="password"
            id="register-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="******"
          />
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.password}
            </motion.p>
          )}
        </motion.div>
      </div>

      <div className="space-y-1">
        <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
          Şifre Tekrarı
        </label>
        <motion.div whileFocus={{ scale: 1.01 }} className="relative">
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="******"
          />
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.confirmPassword}
            </motion.p>
          )}
        </motion.div>
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          <span>Kullanım şartlarını ve gizlilik politikasını kabul ediyorum</span>
        </label>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Kayıt Ol
      </motion.button>
    </motion.form>
  )
}
