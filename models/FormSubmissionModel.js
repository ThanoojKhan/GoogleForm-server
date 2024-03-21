const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubmissionSchema = new Schema({
  form: {
    type: Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  answers: [{
    field: {
      type: Schema.Types.ObjectId,
      ref: 'Field',
      required: true
    },
    value: {
      type: Schema.Types.Mixed,
      required: true
    }
  }]
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
