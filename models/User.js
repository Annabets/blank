const mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

const userSchema = Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    hash:{
        type: String,
        required: true
    },

    email:{
        type: String
    },
    company:{
        type:String
    },
    country:{
        type:String
    },
    city:{
        type:String
    }
});

userSchema.methods.toAuthJSON = function(token) {
    return {
        _id: this._id,
        username: this.username,
        token: token
    }
};

module.exports = mongoose.model('User',userSchema);