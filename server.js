const express = require('express');
const dotenv = require('dotenv');
const connectdb =  require('./config/db');
const errorhandler = require('./middleware/errorhandler');
const cookieParser = require('cookie-parser')
const mongosanitizer = require('express-mongo-sanitize')
const path = require('path')
// Load env varibles
dotenv.config({path : './config/config.env'});

// Connect to the database
connectdb();


const app = express();

//Route files
const Task = require('./routes/TaskManager')

//Body Parser
app.use(express.json());

app.use(mongosanitizer())

// Set Static folder
app.use(express.static(path.join(__dirname,'public')));



//Mount routers
app.use('/TaskManager',Task)

app.use(errorhandler);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT , console.log(`server running at ${PORT}`))   

process.on('unhandledRejection' , (err, promise) => {
    console.log(`Error : ${err.message}`)
    server.close(() => process.exit(1))
})