const mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

const campaignSchema = new Schema({
    name:{
        type: String,
        unique: true,
        required: true
    }
});