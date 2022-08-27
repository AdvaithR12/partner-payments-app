const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TrainingRequestSchema = new Schema({
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
});

var trainingRequest = mongoose.model('TrainingRequest',TrainingRequestSchema);

module.exports = trainingRequest;