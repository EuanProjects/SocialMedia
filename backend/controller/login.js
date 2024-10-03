const asyncHandler = require("express-async-handler");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({ 
                where: { username: username } 
            });
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            };
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" })
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        };
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        done(null, user);
    } catch (err) {
        done(err);
    };
});

exports.postLogin = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred during authentication' });
        }
        if (!user) {
            return res.status(401).json(info);
        }

        jwt.sign({ user: user }, "random", { expiresIn: '1h' }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to generate token' });
            }
            res.json({
                token: token,
                setup: user.setup,
                userId: user.id
            });
        });

    })(req, res, next);
});