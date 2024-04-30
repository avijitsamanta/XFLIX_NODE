const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(config.mongoose.url, config.mongoose.options)
  .then(async () => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
});
app.listen(config.port, () => {
 console.log(`Server is running on port ${config.port}`);
});