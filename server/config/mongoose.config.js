const mongoose = require('mongoose');
const dbName = 'bar_trivia';
mongoose.connect(`mongodb://localhost/trivia`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Connected to  database.`))
    .catch(err => console.log(`Something went wrong when connecting to database.`, err));