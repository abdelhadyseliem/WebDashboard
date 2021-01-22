const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const UserModel = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.discordId)
})

passport.deserializeUser(async (discordId, done) => {
    try {
        const user = await UserModel.findOne({ discordId });
        return user ? done(null, user) : done(null, null);
    } catch (e) {
        done(e, null);
    }
})

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET,
    callbackURL: process.env.CALLBACK_URI,
    scope: ['identify', 'guilds'],
}, async (accessToken, refreshToken, profile, done) => {
    const { id, username, avatar, guilds, discriminator } = profile;
    try {
        const findUser = await UserModel.findOneAndUpdate({ discordId: id }, {
            username,
            tag: discriminator,
            avatar,
            guilds
        }, { new: true });

        if (findUser) {
            return done(null, findUser);
        } else {
            const newUser = await UserModel.create({
                discordId: id,
                username,
                tag: discriminator,
                avatar,
                guilds,
            });
            return done(null, newUser);
        }
    } catch (e) {
        console.log(e);
        return done(e, null);
    }

}))