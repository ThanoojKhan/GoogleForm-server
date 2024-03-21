const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const formRoutes = require('./routers/formRouter');
const { connectDb } = require('./config/dbConnection');

dotenv.config();

const app = express();
const port = process.env.PORT;
const url = process.env.MONGODB_URL;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    optionSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-access-token', 'Cookie']
}));

// Routes
app.use('/api', formRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const startServer = async () => {
    try {
        await connectDb(url);
        const server = app.listen(port, () => {
            console.log(`App connected to db and listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();