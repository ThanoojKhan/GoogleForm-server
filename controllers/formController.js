const Form = require('../models/FormModel');
const Submission = require('../models/FormSubmissionModel');
const validateSubmission = require('../middlewares/validateForm');

exports.createForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(200).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const formData = await Form.find({});
    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.status(200).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.submitForm = async (req, res) => {
  try {
    const submission = req.body;
    const form = await Form.findById(req.params.id);
    const errors = validateSubmission(form, submission);

    if (errors.length > 0)
      return res.status(400).json({ errors });

    const submissionData = {
      form: form._id,
      answers: form.fields.map(field => ({
        field: field._id,
        value: req.body[field.name]
      }))
    };

    const dataSubmission = new Submission(submissionData);
    await dataSubmission.save();
    res.status(200).json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listSubmittedForms = async (req, res) => {
  try {
    const submittedForms = await Submission.find({}).populate('form');
    res.status(200).json(submittedForms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
