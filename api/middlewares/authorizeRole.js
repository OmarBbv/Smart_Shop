import asyncHandler from 'express-async-handler';
import UserTable from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const authorizeRole = {
    isAdmin: asyncHandler(async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Yetkisiz erişim" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await UserTable.findByPk(decoded.userId);

            if (!user) {
                return res.status(404).json({ message: "Kullanıcı bulunamadı" });
            }

            if (user.role !== 2) { // 2: admin
                return res.status(403).json({ message: "Bu işlem için yetkiniz yok" });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(403).json({ message: "Token geçersiz" });
        }
    }),
    
    isUser: asyncHandler(async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Yetkisiz erişim" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await UserTable.findByPk(decoded.userId);

            if (!user) {
                return res.status(404).json({ message: "Kullanıcı bulunamadı" });
            }

            if (user.role !== 1) { // 1: user
                return res.status(403).json({ message: "Sadece kullanıcılar erişebilir" });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(403).json({ message: "Token geçersiz" });
        }
    })
};

export default authorizeRole;
