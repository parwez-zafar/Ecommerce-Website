const mongoose = require('mongoose');
const connect_database = () => {
    mongoose.connect(process.env.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }).then((data) => {
        console.log(`DataBase connected with ${data.connection.host}`);
    })

}

module.exports = connect_database;