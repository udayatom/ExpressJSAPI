const mongoose = require('mongoose');
const PersonSchema = mongoose.Schema(
    {
        Name : {
            type : String,
            required : true
        },
        Email : {
            type : String,
            required : true
        },
        Age : {
            type : String,
            required : true
        },
        CreatedTime : {
            type : Date,
            default: Date.now
        }

    }
);

module.exports = mongoose.model('Persons', PersonSchema);