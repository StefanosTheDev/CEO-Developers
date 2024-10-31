const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Load environment variables
const db = require('./db/database');
const app = require('./app'); // Import your app (Express application)

// Log the environment (development or production)
console.log(app.get('env'));

const port = process.env.PORT || 3000;

db();

app.listen(port, () => {
  console.log(`App is running on port ${port} `);
});
