// 1. First, install required packages
// npm install passport passport-google-oauth20 passport-github2 express-session

// 2. Setup Passport Configuration (passport.config.js)
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from './models/user.model.js';

const configurePassport = (app) => {
  // Initialize passport
  app.use(passport.initialize());

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user exists
          let user = await User.findOne({ email: profile.emails[0].value });
          
          if (user) {
            // If user exists but wasn't created with Google
            if (user.provider !== "google") {
              user.provider = "google";
              await user.save();
            }
          } else {
            // Create new user
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              provider: "google",
              isVerified: true, // Google accounts are verified by default
            });
            await user.save();
          }
          
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  // GitHub Strategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/github/callback",
        scope: ['user:email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // GitHub might not provide email directly, so handle that case
          const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.com`;
          
          // Check if user exists
          let user = await User.findOne({ email });
          
          if (user) {
            // If user exists but wasn't created with GitHub
            if (user.provider !== "github") {
              user.provider = "github";
              await user.save();
            }
          } else {
            // Create new user
            user = new User({
              name: profile.displayName || profile.username,
              email,
              provider: "github",
              isVerified: true, // GitHub accounts are verified by default
            });
            await user.save();
          }
          
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default configurePassport;

// 3. Add OAuth Routes (auth.routes.js)
