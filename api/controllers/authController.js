import asyncHandler from 'express-async-handler'
import UserTable from '../models/userModel.js'
import AuthTable from '../models/authModel.js'
import { generateAccessToken, generateRefreshToken } from '../configs/jwt.js'

const authController = {
    signIn: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await UserTable.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                message: "Email yanlışdır"
            });
        }

        const auth = await AuthTable.findOne({ where: { userId: user.id } });

        if (!auth) {
            return res.status(404).json({ message: "Auth kaydı bulunamadı" });
        }

        const isMatch = password === auth.password;
        if (!isMatch) {
            return res.status(400).json({ message: 'Şifrə yanlışdır' });
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        auth.lastLogin = new Date();
        await auth.save();

        res
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({
                token: accessToken,
                user: { id: user.id, name: user.name, email: user.email }
            });
    }),

    signUp: asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        const existing = await UserTable.findOne({ where: { email } });

        if (existing) {
            return res.status(400).json({ message: "Bu email zaten kayıtlı" });
        }

        const user = await UserTable.create({ name, email, password, role: 1 });

        await AuthTable.create({ userId: user.id, password });

        res.status(201).json({ message: "Kayıt başarılı" });
    }),
};

export default authController;
