import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import UserTable from '../models/userModel.js';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'secret_aw';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: accessTokenSecret,
};

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = await UserTable.findByPk(payload.userId);
            if (user) return done(null, user);
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    })
);

export default passport;
