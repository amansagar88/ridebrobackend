const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    lstart : {
        type: String,
        required : true,
    },
    lend : {
        type: String,
        required : true,
    },
    cost : {
        type: Number,
        required : true,
    },
    Npassenger : {
        type: Number,
        required : true,
    },
    dateandtime : {
        type: String,
        required : true,
    },
    number : {
        type: Number,
        required: true,
    },
    name : {
        type: String,
        required: true,
    }
})


const Ride = mongoose.model('RIDE', rideSchema);

module.exports=Ride;