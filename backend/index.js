const connectToMongo = require('./db');
const express = require('express')

connectToMongo()
  .then(() => {
    // Start your server or do any other necessary operations
    console.log("Am i working ?");
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello Aman Hussain!')
// })

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})