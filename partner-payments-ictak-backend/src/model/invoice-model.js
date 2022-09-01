const mongoose = require("mongoose")

const Schema =  mongoose.Schema;

var invoiceSchema = new Schema({
  partnerName: String,
  partnerEmail: String,
  contactNumber: Number,
  workOrderNumber: String,
  workOrderId: String,
  invoiceNumber: String,
  invoiceType: Boolean,
  adminApproved: Boolean,
  paid: Boolean,
  fileName: String,
  totalAmount: String,
  invoiceDate: Date,
  invoiceDueDate: Date
});


module.exports = mongoose.model('invoice', invoiceSchema)