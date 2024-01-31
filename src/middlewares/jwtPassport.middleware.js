const passport = require('passport');



exports.authenticationJwtCurrent = (req, res, next) => {
    passport.authenticate('current', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'No auth token' });
        }
        req.user = user;
        next();
    })(req, res, next);
};