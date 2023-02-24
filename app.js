const express = require('express')

const mongoose = require('mongoose')
const contentRoute = require('./MongoDB/route/contentRoute')


const app = express();
mongoose.connect('mongodb://localhost:27017/db_mongo',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

const UserRoute = require('./Route/userRoute')
const BukuRoute = require('./Route/bukuRoute')
const CheckRoute = require('./Route/checkRoute');
const RabbitmqRoute = require('./Route/rabbitmqRoute')

const {consumeQueue} = require('./RabbitMQ/produceQueue');
const {consumerRabbit} = require('./RabbitMQ/messageBroker')
consumeQueue('TestProduceQueue', consumerRabbit)



app.use(express.json());
app.use(contentRoute);
app.use(UserRoute);
app.use(BukuRoute);
app.use(CheckRoute)
app.use(RabbitmqRoute)


app.listen(5000, ()=> console.log("server up and running"));
