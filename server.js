import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import studentRoutes from './routes/student.js';

dotenv.config();

const app = express();

app.use(bodyParser.json( {limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded( {limit: '30mb', extended: true}));
app.use(cors());

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

app.use('/student', studentRoutes)

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});
mongoose.connection.once('open', ()=> {
    console.log("MongoDB Connected");
})

app.listen(port, () => {
    console.log('Server is starting on port' + port);
});

