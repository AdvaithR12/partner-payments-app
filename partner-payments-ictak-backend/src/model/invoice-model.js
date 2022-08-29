const mongoose = require("mongoose")

const Schema =  mongoose.Schema;

var invoiceSchema = new Schema({

    name: String,
    email: String,
    contactnumber: Number,
    workorderid: String,
    invoiceid: String,
    invoicetype: String,
    fileName: String

});


module.exports = mongoose.model('invoice', invoiceSchema)