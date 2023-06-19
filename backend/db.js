const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

// const connectToMongo =() =>{
//     mongoose.connect(mongoURI , ()=>{
//         console.log("Connected to Mongo Successfully");
//     })
// }

async function connectToMongo() {
    try {
      await mongoose.connect('mongodb://localhost:27017/database_1', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }

module.exports = connectToMongo;
