const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TrainingRequestSchema = new Schema({
  adminApproved: Boolean,
  financeApproved: Boolean,
  trainingDetails: { 
    topic: String,
    partnerId: String,
    partnerName: String,
  },
  sessionDetails: {
    mode: String,
    venue: String,
    hourlyPayment: Number,
    startTime: Date,
    endTime: Date
  },
  workOrderDetails : {
    workOrderId: String,
    fileName: String,
    generatedDate: Date
  }
});

var WorkOrderCounterSchema = new Schema({
  year: Number,
  month: Number,
  count: Number
});

var trainingRequest = mongoose.model('TrainingRequest', TrainingRequestSchema);
var workOrderCounter = mongoose.model('WorkOrderCounter', WorkOrderCounterSchema);

module.exports = { 
  TrainingRequest: trainingRequest, 
  WorkOrderCounter: workOrderCounter 
};