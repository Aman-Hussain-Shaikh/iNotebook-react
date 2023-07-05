const mongoose = require("mongoose");

// const mongoURI = "mongodb://localhost:27017"
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"

// const connectToMongo =() =>{
//     mongoose.connect(mongoURI , ()=>{
//         console.log("Connected to Mongo Successfully");
//     })
// }

async function connectToMongo() {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }

module.exports = connectToMongo;
