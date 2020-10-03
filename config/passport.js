const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/Users')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" } , (email, password, done) => {
            User.findOne({ where: { email }})
            .then(user => {
                if(!user) {
                    console.log('did not match user')
                    return done(null, false, { msg: 'Email or Password incorrect.'})
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if(isMatch) {
                        console.log('matched user')
                        return done(null, user)
                    } else {
                        console.log('did not match password')
                        return done(null, false, { msg: 'Email or Password incorrect.'})
                    }
                })



            })
            .catch(err => console.log(err))
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });





}