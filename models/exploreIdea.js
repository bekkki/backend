var mongoose = require('mongoose')
mongoose.pluralize(null);
var Schema = mongoose.Schema;
var problemSchema = new Schema({
    userId: {
        type: String,
    },
    message: {
        type: String,
    },
    date: {
        type: String,
    },
})

module.exports = mongoose.model('problemCollection', problemSchema)