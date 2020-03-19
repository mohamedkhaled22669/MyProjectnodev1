if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}



const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser: true ,useUnifiedTopology: true}, (err) => {

    if (err) {
        console.log('err');
    } else {
        console.log('connected to db succesfuly...');
    }

}); 

const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open', () => console.log('connected to monogoose'))