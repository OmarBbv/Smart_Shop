import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'secret_aw';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'secret_aw';

const generateAccessToken = (userId) =>
    jwt.sign({ userId }, accessTokenSecret, { expiresIn: '7d' });
const generateRefreshToken = (userId) =>
    jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' });

const verifyRefreshToken = (token) => {
    try { return jwt.verify(token, refreshTokenSecret); }
    catch (e) { return null; }
};

export { generateAccessToken, generateRefreshToken, verifyRefreshToken }
