const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const bootcamps = require('./routes/bootcamps');

dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/bootcamps', bootcamps);

connectDB();

const server = app.listen(PORT, () => {
    console.log(
        `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});

process.on('unhandledRejection', (err, promise) => {
    console.log(err.message);
    server.close(() => process.exit(1));
});
