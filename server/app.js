// var express = require('express');
// var router = express.Router();
// var app = express();


// /** IMPORT DEPENDENCIES */
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose'); // mongoose module

// /** SETTINGS */
// app.use(bodyParser.json()); // parse application/json
// // set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1/my_database';
// mongoose.connect(mongoDB);
// // get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// // get the default connection
// var db = mongoose.connection;
// // bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, '[DATABASE] MongoDB connection error:'));


// /** SERVE PUBLIC FILES */
// app.use('/', express.static(__dirname + '/dist'));

// /** API ENDPOINTS */
// // import the API controllers
// // var sampleRouter = require('./server/routes/sampleRouter');
// // register controllers for endpoints
// // router.use('/sample', sampleRouter);//Api for devices
// // any route starting with '/api' will be interfacing our API
// app.use('/api', router);


// /** RUN APP */
// var server = app.listen(process.env.PORT || '3000', function () {
//     console.log('[SERVER] I\'m listening on PORT: ' + (process.env.PORT || '3000'));
// });


// module.exports = server;

const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser');

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://developer:Ss110110@cluster0-yugia.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "example";

const app = express();
const port = 3000;
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
//   });
// mongoose.Promise = global.Promise;
// mongoose.connect(config.DB, { useNewUrlParser: true }).then(
//   () => {console.log('Database is connected') },
//   err => { console.log('Can not connect to the database'+ err)}
// );

app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("people");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
    console.log(`Example app listening on port ${port}!`)
});

app.get('/test', (req, res) => res.send({content: 'hellow world'}));

app.post("/person", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

// const express = require('express'),
//     path = require('path'),
//     bodyParser = require('body-parser'),
//     cors = require('cors'),
//     mongoose = require('mongoose'),
//     config = require('./DB');

// const businessRoute = require('./routes/business.route');
// mongoose.Promise = global.Promise;
// mongoose.connect(config.DB, { useNewUrlParser: true }).then(
//   () => {console.log('Database is connected') },
//   err => { console.log('Can not connect to the database'+ err)}
// );

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// app.use('/business', businessRoute);
// const port = process.env.PORT || 4000;

// const server = app.listen(port, function(){
//   console.log('Listening on port ' + port);
// });