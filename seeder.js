const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//Load env
dotenv.config({ path : './config/config.env'})

//Load Model
const Task = require('./models/Task')

mongoose.connect(process.env.MONGO_URI , {})

const task = JSON.parse(fs.readFileSync(`${__dirname}/_data/Task.json`, 'utf-8'));

const importdata = async () => {
    try {
        await Task.create(task);
        console.log('Data Created...')
        process.exit()
    }
    catch (err) {
        console.log(err)
    }
}

const deletedata = async () => {
    try{
        await Task.deleteMany();
        console.log('Data Destoryed...');
        process.exit();
    }
    catch (err){
        console.log(err)
    }
}

if(process.argv[2] === "-i"){
    importdata();
}else if(process.argv[2] === "-d"){
    deletedata();
}