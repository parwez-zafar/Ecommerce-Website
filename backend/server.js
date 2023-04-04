const app = require('./app');

const dotenv = require('dotenv')

// config
dotenv.config({ path: 'backend/config/config.env' });

// DataBase
const connect_database = require('./config/database');
connect_database();


app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})