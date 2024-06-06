const mongoose = require('mongoose');

const connectdb = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI,{
    })

    await mongoose.connection.db.collection('tasks').createIndex({ title: 1 }, { unique: true });
    console.log(`MongoDB Connect : ${conn.connection.host}`)
}

module.exports = connectdb