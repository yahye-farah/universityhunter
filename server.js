const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const keys = require('./keys')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 5000;

mongoose.connect(keys.Url);
const db = mongoose.connection;

db.on('open', () => {
    console.log('MONGO DB Connected Successfuly');
});

db.on('error', () => {
    console.log('MONGO DB Connection Failed')
})

const courseRoute = require('./back-end/routes/course');
const universityRoute = require('./back-end/routes/university');
const countryRoute = require('./back-end/routes/country');
const departmentRoute = require('./back-end/routes/department')

app.use('/course',courseRoute);
app.use('/university', universityRoute)
app.use('/country', countryRoute)
app.use('/department', departmentRoute)

//deployment
if (process.env.NODE_ENV === 'production') {
    // // Serve any static files
    app.use(express.static(path.join(__dirname, './client/build')));
    // // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, './client/build', 'index.html'));
    });
}



app.listen(port, () => {
    console.log(`Your server is listening port ${port}`)
})
