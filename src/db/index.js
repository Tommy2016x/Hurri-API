const mongoose = require('mongoose');

const uri = 'mongodb+srv://Maurice:barnes11@cluster0-acqog.mongodb.net/admin?retryWrites=true&w=majority'

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: 'shellhacks-test',
    useFindAndModify: false,
    useUnifiedTopology: true
    
};

const db = () => Promise.resolve(mongoose.connect(uri, options));


db()
    .then(() => console.log("> Mongo connected"))
    .catch( e => console.log("Mongo error: ", e.message));