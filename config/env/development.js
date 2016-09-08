import path from 'path';

export default {
    root: path.join(__dirname, '../..'),
    port: 3000,
    basePort: 3000,
    db: 'mongodb://localhost/es6-test',
    path: '/',
    mailer: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'techludopia@gmail.com',
            pass: '12ludotech34',
        },
    },
    expiredTime: 24,
    // expiredTime: 0.01,

};
