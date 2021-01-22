const router = require('express').Router();
const passport = require('passport');

router.get('/', async (req, res) => {
    res.render('home', { user: req.user });
})

router.get('/auth', passport.authenticate('discord'));

router.get('/auth/redirect', passport.authenticate('discord', {
    successRedirect: '/',
    failureRedirect: '/forbidden',
}))

router.get('/dashboard', async (req, res) => {
    if (req.user) {
        res.send(req.user)
    } else {
        res.send('normal')
    }
})

module.exports = router;