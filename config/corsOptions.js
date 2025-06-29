const allowedOrigin = require('./allowedOrigins')
    
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    OptionsSuccessStatus: 200
}

// Set Content Security Policy header
// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "connect-src 'self' http://localhost:3500"
//   );
//   next();
// });

module.exports = corsOptions;