import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Router } from "express";
import User from "../../../../entity/User";
import * as passport from "passport";
import * as FacebookStrategy from "passport-facebook";

const router = Router();

const facebookStrategy = FacebookStrategy.Strategy;

router.use(passport.initialize());
router.use(passport.session());
passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CLIENT_UCALLBACK_URL,
      profileFields: ["id", "displayName"]
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("FacebookStrategy", accessToken, refreshToken, profile);
      const user = User.findOrCreate(profile.id, profile.displayName);
      done(null, user);
    }
  )
);

router.get("/", passport.authenticate("facebook"));

router.get(
  "/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default router;
