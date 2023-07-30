const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail,getUserById){

    const authenticateUser = async (email,password,done)=>{
        (async () => {
            try {
                const user = await getUserByEmail(email);
                if (user) {
                  //check this later
                } else {
                    return done(null,false,{message: 'No user with that email'})
                }
                if (await bcrypt.compare(password, user.password)){
                    return done(null,user)
                } else{
                        return done(null,false,{message: 'Password incorrect'})
                }
            } catch (error) {
              console.error('Error:', error);
              return done(error)
            }
        })()
    }
    passport.use(new LocalStrategy({usernameField: 'email'},
    authenticateUser))
    passport.serializeUser((user,done)=> done(null,user.id))
    passport.deserializeUser((id,done)=>{
        (async () => {
            try {
              const user = await getUserById(id);
              if (user) {
                //console.log('User found:', user);
                return done(null,user)
              } else {
                console.log('User not found.');
                return done(null,false)
              }
            } catch (error) {
              console.error('Error:', error);
              return done(error)
            }
        })()
    })

}

module.exports = initialize