const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/mesaynger?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
// const mongoURI = "mongodb+srv://ritojnanm:siddhimade22@cluster0.1w2plwl.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo;