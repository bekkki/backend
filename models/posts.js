var mongoose = require('mongoose')
mongoose.pluralize(null);
var Schema = mongoose.Schema;
var postSchema = new Schema({
    postTitle: {
        type: String,
    },
    postMessage: {
        type: String,
    },
    postImages: {
        type: String,
    },
    date: {
        type: String
    }
})
module.exports = mongoose.model('postCollection', postSchema)