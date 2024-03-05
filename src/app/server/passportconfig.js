const { query } = require('express');
const db = require('./db.js');
const { userInfo } = require('os');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            const query1 = "SELECT * FROM userdata.users WHERE username = ?";
            const query2 = "SELECT * FROM userdata.users WHERE password = ?";
            db.query(query1, [username], (err, result) => {
                if (err) { throw err; }
                if (result.length === 0) {
                    return done(null, false);
                }
                db.query(query2, [password], (err, result) => {
                    if (err) { throw err; }
                    if (result.length === 0) {
                        return done(null, false);
                    }
                    return done(null, result[0]);
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        const query = "SELECT * FROM userdata.users WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) { return done(err); }

            if (result.length === 0) {
                return done(null, false);
            }

            const user = result[0];
            const userInfo = {
                id: user.id,
                username: user.username
            };
            done(null, userInfo);
        });
    });
};