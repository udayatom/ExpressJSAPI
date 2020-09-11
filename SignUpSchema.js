const mongoose = require('mongoose');
const SignupSchema = mongoose.Schema(
    {
        Name : {
            type : String,
            required : true
        },
        Email : {
            type : String,
            required : true
        },
        Password : {
            type : String,
            required : true
        } 

    }
);

module.exports = mongoose.model('UserAuths', SignupSchema);