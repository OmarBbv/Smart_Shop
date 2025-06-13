import asyncHandler from 'express-async-handler'
import UserTable from '../models/userModel.js'
import AuthTable from '../models/authModel.js'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../configs/jwt.js'

const authController = {
    signIn: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await UserTable.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Geçersiz e‑posta veya şifre' });

        const auth = await AuthTable.findOne({ where: { userId: user.id } });
        if (!auth || auth.password !== password)
            return res.status(401).json({ message: 'Geçersiz e‑posta veya şifre' });

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        auth.lastLogin = new Date();
        await auth.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).json({
            token: accessToken,
            user: { id: user.id, name: user.name, email: user.email }
        });
    }),

    refreshToken: asyncHandler(async (req, res) => {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: 'Refresh token yok.' });

        const payload = verifyRefreshToken(token);
        if (!payload) return res.status(403).json({ message: 'Geçersiz refresh token' });

        const newAccessToken = generateAccessToken(payload.userId);
        res.status(200).json({ token: newAccessToken });
    }),

    signUp: asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        const exists = await UserTable.findOne({ where: { email } });
        if (exists) return res.status(400).json({ message: 'Bu email zaten kayıtlı' });

        const user = await UserTable.create({ name, email, password, role: 1 });
        await AuthTable.create({ userId: user.id, password });
        console.log(user);

        res.status(201).json({ message: 'Kayıt başarılı', data: user });
    })
};

export default authController;
