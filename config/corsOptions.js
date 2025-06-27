const whitelist = [
    'https://www.mysite.com', 
    'http://127.0.0.1:5500',
    'http://localhost:3500'
];
    
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
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