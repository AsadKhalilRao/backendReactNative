// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandling');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const countriesRouter = require('./routes/country');
const placesRouter = require('./routes/place');

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected Congratulations!!!');
  })
  .catch((error) => {
    console.error(`Warning Connection Failed! The error is ${error}`);
  });

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(errorHandler);

// Routes
app.use('/api/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/places', placesRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
const port = process.env.PORT || 5003;
app.listen(port, () => {
  console.log(`App listening at port ${port}!`);
});
