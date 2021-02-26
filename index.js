const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/tasks');
const categoryRouter= require ('./routes/category')
const dotenv = require('dotenv').config();
const auth = require('./auth');
const cors = require('cors');
const uploadRouter = require('./routes/upload');
const fileuploadRouter= require('./routes/uploadFiles')
const proposalRouter = require('./routes/proposal');
const app = express();
app.options('*', cors());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
mongoose.connect(process.env.URL, { useNewUrlParser: true, 
    useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("SUCCESSFULLY CONNECTED TO DATABASE SERVER");
    }, (err) => console.log(err));
app.use('/users', userRouter);
app.use('/upload', uploadRouter);
app.use('/uploadFiles', fileuploadRouter)
app.use('/tasks', taskRouter);
app.use('/category', categoryRouter);
app.use('/submitProposal', proposalRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});
app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});