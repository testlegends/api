/**
 * Passport
 *
 * @description ::
 * @docs        :: https://github.com/jaredhanson/oauth2orize/tree/master/examples/all-grants
 * @author      :: Jeff Lee
 * @created     :: 2014/04/20
 */

var passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    APIKeyStrategy = require('passport-localapikey').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token).  If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy(
    function (accessToken, done) {
        AccessToken.findOne({ token: accessToken }, function (err, token) {
            if (err) { return done(err); }
            if (!token) { return done(null, false); }

            if (token.userId !== null) {
                User.findOne({ id: token.userId }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    // to keep this example simple, restricted scopes are not implemented,
                    // and this is just for illustrative purposes
                    var info = { scope: '*' };
                    done(null, user, info);
                });
            } else {
                //The request came from a client only since userID is null
                //therefore the client is passed back instead of a user
                Client.findOne({ _id: token.clientId }, function (err, client) {
                    if (err) { return done(err); }
                    if (!client) { return done(null, false); }
                    // to keep this example simple, restricted scopes are not implemented,
                    // and this is just for illustrative purposes
                    var info = { scope: '*' };
                    done(null, client, info);
                });
            }
        });
    }
));

passport.use(new APIKeyStrategy({
    apiKeyField: 'key'
}, function (key, done) {
    Client.findOne({ apikey: key }, function (err, apikey) {
        if (err) { return done(err); }
        if (!apikey) { return done(null, false); }

        User.findOneById(apikey.userId, function (err, user) {
            if (err) { return done(err); }
                if (!user) { return done(null, false); }

                    return done(null, user);
                });
            });
        }
));


module.exports = {
    express: {
        customMiddleware: function (app) {
            app.use(passport.initialize());
            app.use(passport.session());
        }
    }
};
