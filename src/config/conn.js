const { connect } = require('mongoose');
require('dotenv').config();

const dbConnectionString = process.env.MONGODB_URL;

connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database Connected');
  })
  .catch(() => {
    console.log('Database Connection Error');
  });
