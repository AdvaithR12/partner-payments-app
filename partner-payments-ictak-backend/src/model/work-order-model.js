const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TrainingRequestSchema = new Schema({
  approved: Boolean,
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

var trainingRequest = mongoose.model('TrainingRequest',TrainingRequestSchema);

module.exports = trainingRequest;