import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, accessTokenSecret, { expiresIn: '10m' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' });
};

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, accessTokenSecret);
    } catch (error) {
        return null;
    }
};

const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, refreshTokenSecret);
    } catch (error) {
        return null;
    }
};

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};
