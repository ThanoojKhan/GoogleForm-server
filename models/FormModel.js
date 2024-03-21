const mongoose = require('mongoose');
const { Schema } = mongoose;

const FieldSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'checkbox', 'radio']
  },
  required: {
    type: Boolean,
    default: false
  },
  options: {
    type: [String],
    required: function () {
      return this.type === 'radio' || this.type === 'checkbox';
    }
  }
});

const FormSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  fields: {
    type: [FieldSchema],
    required: true,
    validate: {
      validator: function (fields) {
        return fields.length > 0;
      },
      message: 'At least one field is required.'
    }
  }
});

const Form = mongoose.model('Form', FormSchema);

module.exports = Form;
