const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const taskRoute = require('./routes/taskRoute');
const userRoute = require('./routes/userRoute')
// const scheduleTask = require('./schedulers/scheduler');
// const completionCheck = require('./schedulers/completionCheck')

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/routes', taskRoute);
app.use('/api/user', userRoute);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to MongoDB and listening to port ', process.env.PORT);
        })
        // scheduleTask();
        // completionCheck();
    })
    .catch(err => console.log(err))
