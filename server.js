import express from 'express';
import bodyParser from 'body-parser';
import router from './app/routes/router.js';
import mongoose from 'mongoose';
import dbConfig from './database.config.js';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => console.log("Connected")).catch(err => {
        console.log(err);
        process.exit();
    });

app.use(bodyParser.json());

app.use('/', router);

app.listen(3000);